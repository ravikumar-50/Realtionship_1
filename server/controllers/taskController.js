const pool = require('../config/database');
const { generateTask } = require('../services/aiService');
const { TASK_CATEGORIES, TONES } = require('../prompts/master-prompt');

/**
 * Get today's task for the couple
 */
async function getDailyTask(req, res) {
    const userId = req.user.userId;

    try {
        // Get user's partner relationship
        const partnerResult = await pool.query(
            'SELECT * FROM partners WHERE (user1_id = $1 OR user2_id = $1) AND status = $2',
            [userId, 'active']
        );

        if (partnerResult.rows.length === 0) {
            return res.status(404).json({
                error: 'No active partner found',
                message: 'Please link with your partner first'
            });
        }

        const partnership = partnerResult.rows[0];
        const today = new Date().toISOString().split('T')[0];

        // Check if task already exists for today
        const existingTask = await pool.query(
            'SELECT * FROM daily_tasks WHERE partner_id = $1 AND task_date = $2',
            [partnership.id, today]
        );

        if (existingTask.rows.length > 0) {
            return res.json({ task: existingTask.rows[0] });
        }

        // Generate new task (this would normally be done by a scheduled job)
        return res.status(404).json({
            message: 'No task for today yet. Task generation is scheduled daily.',
            canGenerate: true
        });
    } catch (error) {
        console.error('Get daily task error:', error);
        res.status(500).json({ error: 'Server error fetching task' });
    }
}

/**
 * Generate new task (admin/automated endpoint)
 */
async function generateDailyTask(req, res) {
    const userId = req.user.userId;

    try {
        // Get user's partner relationship
        const partnerResult = await pool.query(
            'SELECT * FROM partners WHERE (user1_id = $1 OR user2_id = $1) AND status = $2',
            [userId, 'active']
        );

        if (partnerResult.rows.length === 0) {
            return res.status(404).json({ error: 'No active partner found' });
        }

        const partnership = partnerResult.rows[0];
        const today = new Date().toISOString().split('T')[0];

        // Get recent moods/feedback for context
        const category = TASK_CATEGORIES.APPRECIATION;
        const tone = TONES.CALM;

        // Generate task using AI
        const aiResult = await generateTask({
            userMood: 'calm',
            partnerMood: 'calm',
            feedbackSummary: 'No recent feedback',
            taskCategory: category,
            tone: tone
        });

        if (!aiResult.success) {
            console.warn('AI generation failed, using fallback');
        }

        const task = aiResult.task;

        // Save to database
        const result = await pool.query(
            `INSERT INTO daily_tasks (partner_id, task_date, task_category, task_title, task_description, action_steps, reflection_question, ai_used, tone)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
            [
                partnership.id,
                today,
                category,
                task.title,
                task.description,
                task.actionSteps,
                task.reflectionQuestion,
                aiResult.success,
                tone
            ]
        );

        res.json({
            message: 'Task generated successfully',
            task: result.rows[0]
        });
    } catch (error) {
        console.error('Generate task error:', error);
        res.status(500).json({ error: 'Server error generating task' });
    }
}

/**
 * Mark task as completed
 */
async function completeTask(req, res) {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        // For now, we could add a 'completed_by' column or similar
        // This is a simple acknowledgment endpoint
        res.json({ message: 'Task marked as completed', taskId: id });
    } catch (error) {
        console.error('Complete task error:', error);
        res.status(500).json({ error: 'Server error completing task' });
    }
}

module.exports = {
    getDailyTask,
    generateDailyTask,
    completeTask
};
