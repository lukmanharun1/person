const express = require('express')
const router = express.Router();

const controller = require('../controller/person');
const validate = require('../middlewares/validate');
const validation = require('../validations/person');
router.get('/', controller.getAll);
router.post('/', validation.create(), validate, controller.create);
module.exports = router;