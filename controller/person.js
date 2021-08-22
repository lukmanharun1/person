const { Person } = require('../models')

const getAll = async (req, res, next) => {
    try {
        const person = await Person.findAll();
        res.send({
            status: 'success',
            data: person
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAll
}