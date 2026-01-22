const pool = require('../config/database');

/**
 * Link two users as partners
 */
async function linkPartner(req, res) {
    const userId = req.user.userId;
    const { partnerEmail } = req.body;

    try {
        // Find partner by email
        const partnerResult = await pool.query(
            'SELECT id FROM users WHERE email = $1',
            [partnerEmail]
        );

        if (partnerResult.rows.length === 0) {
            return res.status(404).json({ error: 'Partner not found with that email' });
        }

        const partnerId = partnerResult.rows[0].id;

        if (partnerId === userId) {
            return res.status(400).json({ error: 'You cannot partner with yourself' });
        }

        // Check if partnership already exists
        const existingPartnership = await pool.query(
            'SELECT * FROM partners WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1)',
            [userId, partnerId]
        );

        if (existingPartnership.rows.length > 0) {
            return res.status(400).json({ error: 'Partnership already exists' });
        }

        // Create partnership
        const result = await pool.query(
            'INSERT INTO partners (user1_id, user2_id, status) VALUES ($1, $2, $3) RETURNING *',
            [userId, partnerId, 'active']
        );

        res.status(201).json({
            message: 'Partner linked successfully',
            partnership: result.rows[0]
        });
    } catch (error) {
        console.error('Link partner error:', error);
        res.status(500).json({ error: 'Server error linking partner' });
    }
}

/**
 * Get current user's partner info
 */
async function getPartnerInfo(req, res) {
    const userId = req.user.userId;

    try {
        const result = await pool.query(
            `SELECT p.*, 
              CASE 
                WHEN p.user1_id = $1 THEN u2.name
                ELSE u1.name
              END as partner_name,
              CASE 
                WHEN p.user1_id = $1 THEN u2.email
                ELSE u1.email
              END as partner_email
       FROM partners p
       LEFT JOIN users u1 ON p.user1_id = u1.id
       LEFT JOIN users u2 ON p.user2_id = u2.id
       WHERE (p.user1_id = $1 OR p.user2_id = $1) AND p.status = 'active'`,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                hasPartner: false,
                message: 'No active partner found'
            });
        }

        res.json({
            hasPartner: true,
            partner: result.rows[0]
        });
    } catch (error) {
        console.error('Get partner info error:', error);
        res.status(500).json({ error: 'Server error fetching partner info' });
    }
}

module.exports = {
    linkPartner,
    getPartnerInfo
};
