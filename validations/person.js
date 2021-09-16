const { body, param, query } = require('express-validator');

const getAll = () => [
    query('name')
        .optional()
        .isString(),
    query('age')
        .optional()
        .isInt({ min: 1 }),
    query('gender')
        .optional()
        .isIn(['female', 'male']),
    query('address')
        .optional()
        .isString(),
];

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
        .notEmpty()
        .isInt()
];

const update = () => [
    param('id')
        .notEmpty()
        .isInt(),
        body('name')
        .optional()
        .notEmpty()
        .isString(),
    body('age')
        .optional()
        .notEmpty()
        .isInt(),
    body('gender')
        .optional()
        .notEmpty()
        .isIn(['female', 'male']),
    body('address')
        .optional()
        .notEmpty()
        .isString()
        .isLength({ min: 20 })
]

const destroy = () => [
    param('id')
        .notEmpty()
        .isInt()
]

module.exports = {
    getAll,
    create,
    findById,
    update,
    destroy
}