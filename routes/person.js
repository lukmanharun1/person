const express = require('express')
const router = express.Router();

const controller = require('../controller/person');
const validate = require('../middlewares/validate');
const validation = require('../validations/person');
router.get('/', controller.getAll);
router.post('/', validation.create(), validate, controller.create);
router.get('/:id', validation.findById(), validate, controller.findById);
router.put('/:id', validation.update(), validate, controller.update);
module.exports = router;