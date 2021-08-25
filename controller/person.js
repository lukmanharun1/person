const { Person } = require('../models')

const getAll = async (req, res, next) => {
    try {
        const person = await Person.findAll();
        if (person.length <= 0) {
            res.status(404).send({
                message: 'person not found'
            });
        }
        res.status(200).send({
            status: 'success',
            data: person
        });
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
            res.status(400).send({
                status: 'error',
                message: 'Person failed created'
            });
        }
        res.status(201).send({
            status: 'success',
            data: createPerson
        });
    } catch (error) {
        next(error);
    }
}

const findById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const findPersonById = await Person.findByPk(id);
        if (!findPersonById) {
            res.status(404).send({
                status: 'error',
                message: `Person with id ${id} not found`
            });
        }
        res.status(200).send({
            status: 'success',
            data: findPersonById
        });

    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, age, gender, address } = req.body;
        const findPersonById = await Person.findOne({
            where: {
                id
            }
        });
        if (!findPersonById) {
            res.status(404).send({
                status: 'error',
                message: `Person with id ${id} not found`
            });
        }
        if (name) findPersonById.name = name;
        if (age) findPersonById.age = age;
        if (gender) findPersonById.gender = gender;
        if (address) findPersonById.address = address;
        const updatePerson = await findPersonById.save();
        if (!updatePerson) {
            res.status(400).send({
                status: 'error',
                message: `data person with id ${id} failed update`
            });
        }
        res.status(200).send({
            status: 'success',
            data: updatePerson
        });
        
    } catch (error) {
        next(error);
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;
        const findPersonById = await Person.findByPk(id);
        if (!findPersonById) {
            res.status(404).send({
                status: 'error',
                message: `person with id ${id} not found`          
            })
        }
        const deletePerson = findPersonById.destroy();
        if (!deletePerson) {
            res.status(503).send({
                status: 'error',
                message: `person with id ${id} failed delete`
            });
        }
        res.status(200).send({
            status: 'success',
            message: `person with id ${id} deleted`
        });
    } catch (error) {
        next(error);
    }
}
module.exports = {
    getAll,
    create,
    findById,
    update,
    destroy
}