const pool = require('../config/database');

/**
 * Submit feedback for a task
 */
async function submitFeedback(req, res) {
    const userId = req.user.userId;
    const { taskId, mood, feedbackText, sentiment } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO feedback (task_id, user_id, mood, feedback_text, sentiment) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [taskId, userId, mood, feedbackText, sentiment]
        );

        res.status(201).json({
            message: 'Feedback submitted successfully',
            feedback: result.rows[0]
        });
    } catch (error) {
        console.error('Submit feedback error:', error);
        res.status(500).json({ error: 'Server error submitting feedback' });
    }
}

/**
 * Get partner's recent feedback
 */
async function getPartnerFeedback(req, res) {
    const userId = req.user.userId;

    try {
        // Get partner ID
        const partnerResult = await pool.query(
            `SELECT CASE 
         WHEN user1_id = $1 THEN user2_id
         ELSE user1_id
       END as partner_id
       FROM partners 
       WHERE (user1_id = $1 OR user2_id = $1) AND status = 'active'`,
            [userId]
        );

        if (partnerResult.rows.length === 0) {
            return res.status(404).json({ error: 'No partner found' });
        }

        const partnerId = partnerResult.rows[0].partner_id;

        // Get partner's recent feedback
        const feedbackResult = await pool.query(
            'SELECT * FROM feedback WHERE user_id = $1 ORDER BY submitted_at DESC LIMIT 10',
            [partnerId]
        );

        res.json({ feedback: feedbackResult.rows });
    } catch (error) {
        console.error('Get partner feedback error:', error);
        res.status(500).json({ error: 'Server error fetching feedback' });
    }
}

module.exports = {
    submitFeedback,
    getPartnerFeedback
};
