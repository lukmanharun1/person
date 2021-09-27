const express = require('express')
const router = express.Router();

const controller = require('../controller/person');
const validate = require('../middlewares/validate');
const validation = require('../validations/person');
router.get('/', validation.getAll(), validate, controller.getAll);
router.post('/', validation.create(), validate, controller.create);
router.get('/:id', validation.findById(), validate, controller.findById);
router.put('/', validation.multipleCreateUpdateDelete(), validate, controller.multipleCreateUpdateDelete)
router.put('/:id', validation.update(), validate, controller.update);
router.delete('/:id', validation.destroy(), validate, controller.destroy);
module.exports = router;