const { Router } = require('express');
const healthController = require('./health.ctrl');

const router = Router();
router.get('/health', healthController.checkHealth);

module.exports = router;
