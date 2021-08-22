const express = require('express')
const router = express.Router();

const controller = require('../controller/person');
router.get('/', controller.getAll);

module.exports = router;