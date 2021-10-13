const { Person, Image, Item, Sequelize } = require('../models')

const t = require('../helpers/transaction');
const { pagination } = require('../helpers/pagination');
const getAll = async (req, res, next) => {
    try {
        const where = {};
        // query params
        const { name, age, gender, address } = req.query;
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const per_page = req.query.per_page ? parseInt(req.query.per_page) : 1;
        if (name) where.name = { [Sequelize.Op.like]: `%${name}%` }
        if (age) where.age = { [Sequelize.Op.eq]: age }
        if (gender) where.gender = { [Sequelize.Op.eq]: gender }
        if (address) where.address = { [Sequelize.Op.like]: `%${address}%` }

        const { count, rows } = await Person.findAndCountAll({
            where,
            offset: (page - 1) * page,
            limit: per_page,
            distinct: true,
            include: [
                {
                    model: Image,
                },
                {
                    model: Item,
                }

            ],
            order: [['name', 'ASC']]
        });
        const result = pagination({
            data: rows,
            count,
            page,
            per_page
        });

        if (count <= 0) {
            res.status(404).send({
                message: 'person not found'
            });
        }
        res.status(200).send({
            status: 'success',
            data: result
        });
    } catch (error) {
        next(error);
    }
}

const create = async (req, res, next) => {
    try {
        const { data } = req.body;
        // create transaction
        const transaction = await t.create();
        if (!transaction.status && transaction.error) {
            throw transaction.error;
        }
        const createPerson = await Person.bulkCreate(data, { transaction: transaction.data });
        if (!createPerson) {
            // rollback transaction
            await t.rollback(transaction.data);
            res.status(400).send({
                status: 'error',
                message: 'Person failed created'
            });
        }
        // commit transaction
        const commit = await t.commit(transaction.data);
        if (!commit.status && commit.error) {
            throw commit.error;
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
        const findPersonById = await Person.findByPk(id, {
            include: [
                {
                    model: Image,
                },
                {
                    model: Item,
                }

            ],
        });
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
        // create transaction
        const transaction = await t.create();
        if (!transaction.status && transaction.error) {
            throw transaction.error;
        }
        const { name, age, gender, address } = req.body;
        const findPersonById = await Person.findOne({
            where: {
                id
            },
            transaction: transaction.data
        });
        if (!findPersonById) {
            // rollback transaction
            await t.rollback(transaction.data);
            res.status(404).send({
                status: 'error',
                message: `Person with id ${id} not found`
            });
        }
        if (name) findPersonById.name = name;
        if (age) findPersonById.age = age;
        if (gender) findPersonById.gender = gender;
        if (address) findPersonById.address = address;
        const updatePerson = await findPersonById.save({ transaction: transaction.data });
        if (!updatePerson) {
            // rollback transaction
            await t.rollback(transaction.data);
            res.status(400).send({
                status: 'error',
                message: `data person with id ${id} failed update`
            });
        }
        // commit transaction
        const commit = await t.commit(transaction.data);
        if (!commit.status && commit.error) {
            throw commit.error;
        }
        res.status(200).send({
            status: 'success',
            data: updatePerson
        });

    } catch (error) {
        next(error);
    }
}

const multipleCreateUpdateDelete = async (req, res, next) => {
    try {
        const { created, updated, deleted } = req.body;
        const response = {
            status: 'success',
            data: {
                created: null,
                updated: null,
                deleted: null,
            }
        }
        // create transaction
        const transaction = await t.create();
        if (!transaction.status && transaction.error) {
            throw transaction.error;
        }
        // create person
        if (created) {
            const createPerson = await Person.bulkCreate(created, { transaction: transaction.data });
            if (!createPerson) {
                // rollback transaction
                await t.rollback(transaction.data);
                res.status(400).send({
                    status: 'error',
                    message: 'Person failed created'
                });
            }
            response.data.created = createPerson;
        }

        // update person
        if (updated) {
            const updatePersons = await Promise.all(updated.map(async person => {
                const { id, name, age, gender, address } = person;

                // check id person
                const findPerson = await Person.findByPk(id, { transaction: transaction.data });
                if (!findPerson) {
                    // rollback transaction
                    await t.rollback(transaction.data);
                    res.status(400).send({
                        status: 'error',
                        message: 'Person not found and failed to updated'
                    });
                }
                // update person
                if (name) findPerson.name = name;
                if (age) findPerson.age = age;
                if (gender) findPerson.gender = gender;
                if (address) findPerson.address = address;
                const updatePerson = await findPerson.save({ transaction: transaction.data });
                if (!updatePerson) {
                    // rollback transaction
                    await t.rollback(transaction.data);
                    res.status(400).send({
                        status: 'error',
                        message: 'Person failed to updated'
                    });
                }
                return updatePerson;
            }));
            response.data.updated = updatePersons;
        }

        // delete person
        if (deleted) {
            const deletePersons = await Promise.all(deleted.map(async person => {
                // check id person
                const findPerson = await Person.findByPk(person.id, { transaction: transaction.data });
                if (!findPerson) {
                    // rollback transaction
                    await t.rollback(transaction.data);
                    res.status(400).send({
                        status: 'error',
                        message: 'Person not found and failed to deleted'
                    });
                }
                // delete person
                const deletePerson = await findPerson.destroy({ transaction: transaction.data });
                if (!deletePerson) {
                    // rollback transaction
                    await t.rollback(transaction.data);
                    res.status(400).send({
                        status: 'error',
                        message: 'failed to deleted'
                    });
                }
                return {
                    message: 'Person deleted successfully'
                }

            }));
            response.data.deleted = deletePersons;
        }

        // commit transaction
        const commit = await t.commit(transaction.data);
        if (commit.status && commit.error) {
            throw commit.error;
        }
        res.status(200).send(response);

    } catch (error) {
        next(error);
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;
        // create transaction
        const transaction = await t.create();
        if (!transaction.status && transaction.error) {
            throw transaction.error;
        }
        const findPersonById = await Person.findByPk(id, { transaction: transaction.data });
        if (!findPersonById) {
            // rollback transaction
            await t.rollback(transaction.data);
            res.status(404).send({
                status: 'error',
                message: `person with id ${id} not found`
            })
        }
        const deletePerson = await findPersonById.destroy({ transaction: transaction.data });
        if (!deletePerson) {
            // rollback transaction
            await t.rollback(transaction.data);
            res.status(503).send({
                status: 'error',
                message: `person with id ${id} failed delete`
            });
        }
        // commit transaction
        const commit = await t.commit(transaction.data);
        if (!commit.status && commit.error) {
            throw commit.error;
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
    multipleCreateUpdateDelete,
    destroy,
}