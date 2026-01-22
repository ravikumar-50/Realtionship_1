const express = require('express');
const { getDailyTask, generateDailyTask, completeTask } = require('../controllers/taskController');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

router.get('/daily', authenticateToken, getDailyTask);
router.post('/generate', authenticateToken, generateDailyTask);
router.post('/:id/complete', authenticateToken, completeTask);

module.exports = router;
