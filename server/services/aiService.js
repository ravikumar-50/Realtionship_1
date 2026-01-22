const { GoogleGenerativeAI } = require('@google/generative-ai');
const { generateMasterPrompt, TONES, TASK_CATEGORIES } = require('../prompts/master-prompt');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate a relationship task using AI
 * @param {Object} context - Generation context
 * @returns {Promise<Object>} - Generated task object
 */
async function generateTask(context) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const prompt = generateMasterPrompt(context);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse JSON response
        const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const taskData = JSON.parse(cleanedText);

        return {
            success: true,
            task: taskData
        };
    } catch (error) {
        console.error('❌ AI Task Generation Error:', error);

        // Fallback to a safe default task
        return {
            success: false,
            task: getFallbackTask(context.taskCategory),
            error: error.message
        };
    }
}

/**
 * Fallback tasks when AI fails
 */
function getFallbackTask(category) {
    const fallbacks = {
        [TASK_CATEGORIES.APPRECIATION]: {
            title: 'A Small Thank You',
            description: 'Today is about noticing something simple but meaningful.',
            actionSteps: 'Each of you share one thing you appreciated about the other today.',
            reflectionQuestion: 'How did it feel to hear this from your partner?'
        },
        [TASK_CATEGORIES.COMMUNICATION]: {
            title: 'Listening Without Fixing',
            description: 'Sometimes the best support is just being present.',
            actionSteps: 'Ask your partner about their day. Listen without trying to solve or fix anything. Just be there.',
            reflectionQuestion: 'What did you learn about your partner today?'
        },
        [TASK_CATEGORIES.QUALITY_TIME]: {
            title: '15 Minutes Together',
            description: 'Quality time doesn\'t need to be complicated.',
            actionSteps: 'Spend 15 minutes together doing something you both enjoy. No phones, no distractions.',
            reflectionQuestion: 'How did this time strengthen your connection?'
        }
    };

    return fallbacks[category] || fallbacks[TASK_CATEGORIES.APPRECIATION];
}

module.exports = {
    generateTask
};
