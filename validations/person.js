const { body, param } = require('express-validator');

const create = () => [
    body('name')
        .notEmpty()
        .isString(),
    body('age')
        .notEmpty()
        .isInt(),
    body('gender')
        .notEmpty()
        .isIn(['female', 'male']),
    body('address')
        .notEmpty()
        .isString()
        .isLength({ min: 20 })
];

const findById = () => [
    param('id')
        .optional()
        .notEmpty()
        .isInt()
];

module.exports = {
    create,
    findById
}