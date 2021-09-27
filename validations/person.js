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
    query('page')
        .optional()
        .isInt({ min: 1 }),
    query('per_page')
        .optional()
        .isInt({ min: 1 })
];

const create = () => [
    body('data')
        .notEmpty()
        .isArray(),
    body('data.*.name')
        .notEmpty()
        .isString(),
    body('data.*.age')
        .notEmpty()
        .isInt(),
    body('data.*.gender')
        .notEmpty()
        .isIn(['female', 'male']),
    body('data.*.address')
        .notEmpty()
        .isString()
        .isLength({ min: 20 })
];

const findById = () => [
    param('id')
        .notEmpty()
        .isUUID()
];

const update = () => [
    param('id')
        .notEmpty()
        .isUUID(),
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

const multipleCreateUpdateDelete = () => [
    body('created')
        .optional()
        .isArray(),
    body('created.*.name')
        .notEmpty()
        .isString(),
    body('created.*.age')
        .notEmpty()
        .isInt(),
    body('created.*.gender')
        .notEmpty()
        .isIn(['female', 'male']),
    body('created.*.address')
        .notEmpty()
        .isString()
        .isLength({ min: 20 }),

    body('updated')
        .optional()
        .isArray(),
    body('updated.*.id')
        .notEmpty()
        .isUUID(),
    body('updated.*.name')
        .optional()
        .notEmpty()
        .isString(),
    body('updated.*.age')
        .optional()
        .notEmpty()
        .isInt(),
    body('updated.*.gender')
        .optional()
        .notEmpty()
        .isIn(['female', 'male']),
    body('updated.*.address')
        .optional()
        .notEmpty()
        .isString()
        .isLength({ min: 20 }),

    body('deleted')
        .optional()
        .isArray(),
    body('deleted.*.id')
        .notEmpty()
        .isUUID()
]

const destroy = () => [
    param('id')
        .notEmpty()
        .isUUID()
]

module.exports = {
    getAll,
    create,
    findById,
    update,
    multipleCreateUpdateDelete,
    destroy
}