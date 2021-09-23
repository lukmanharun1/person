'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Person', 'id', {
      type: Sequelize.UUID,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Person', 'id', {
      autoIncrement: true,
      type: Sequelize.INTEGER,
    })
  }
};
