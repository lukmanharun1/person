const { Person } = require('../models')

const getAll = async (req, res, next) => {
    try {
        const person = await Person.findAll();
        if (person.length <= 0) {
            res.send({
                message: 'person not found'
            }, 404);
        }
        res.send({
            status: 'success',
            data: person
        }, 200);
    } catch (error) {
        next(error);
    }
}

const create = async (req, res, next) => {
    try {
        const { name, age, gender, address } = req.body;
        const dataCreate = { name, age, gender, address };
        const createPerson = await Person.create(dataCreate);
        if (!createPerson) {
            res.send({
                status: 'error',
                message: 'Person failed created'
            }, 500);
        }
        res.send({
            status: 'success',
            data: createPerson
        });
        
    } catch (error) {
        next(error);
    }
}
module.exports = {
    getAll,
    create
}