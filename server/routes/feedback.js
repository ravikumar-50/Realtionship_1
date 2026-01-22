const express = require('express');
const { submitFeedback, getPartnerFeedback } = require('../controllers/feedbackController');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticateToken, submitFeedback);
router.get('/partner', authenticateToken, getPartnerFeedback);

module.exports = router;
