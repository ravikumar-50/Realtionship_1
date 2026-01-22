const express = require('express');
const { linkPartner, getPartnerInfo } = require('../controllers/partnerController');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

router.post('/link', authenticateToken, linkPartner);
router.get('/me', authenticateToken, getPartnerInfo);

module.exports = router;
