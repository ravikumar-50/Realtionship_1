const TONES = {
    CALM: 'Calm, reassuring, slow-paced, gentle words',
    ROMANTIC: 'Loving, affectionate, emotionally expressive',
    PLAYFUL: 'Light, joyful, friendly, slightly humorous'
};

const TASK_CATEGORIES = {
    APPRECIATION: 'appreciation',
    COMMUNICATION: 'communication',
    QUALITY_TIME: 'quality_time',
    EMOTIONAL_CHECK_IN: 'emotional_check_in',
    PLAYFULNESS: 'playfulness',
    SUPPORT: 'support'
};

/**
 * Generate the master AI prompt with dynamic context
 * @param {Object} context - Task generation context
 * @returns {string} - Formatted prompt for AI
 */
function generateMasterPrompt(context) {
    const {
        userMood = 'neutral',
        partnerMood = 'neutral',
        feedbackSummary = 'No recent feedback',
        taskCategory = TASK_CATEGORIES.APPRECIATION,
        tone = TONES.CALM
    } = context;

    return `You are a calm, supportive relationship companion.
You NEVER judge, blame, or take sides.
You speak gently, warmly, and respectfully.

Context:
- User A mood: ${userMood}
- User B mood: ${partnerMood}
- Recent feedback summary: ${feedbackSummary}
- Task category (decided by rules): ${taskCategory}
- Tone required: ${tone}

Your job:
Generate ONE daily couple task that:
- Feels emotionally safe
- Encourages connection
- Is small and achievable
- Treats both partners equally

Rules:
- No confrontation
- No assumptions
- No advice unless asked
- If mood is sad or low, prioritize comfort and appreciation

Output format (JSON only, no markdown):
{
  "title": "Task title here",
  "description": "Brief emotional context explaining why this task matters",
  "actionSteps": "Clear, simple steps for both partners to follow",
  "reflectionQuestion": "A gentle question to encourage reflection"
}

Respond ONLY with valid JSON. No additional text.`;
}

module.exports = {
    TONES,
    TASK_CATEGORIES,
    generateMasterPrompt
};
