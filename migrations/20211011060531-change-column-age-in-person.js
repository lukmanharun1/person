'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('Person', 'age', {
          type: Sequelize.INTEGER(3)
        }, { transaction: t })
      ])
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('Person', 'age', {
          type: Sequelize.INTEGER
        }, { transaction: t })
      ])
    })
  }
};
