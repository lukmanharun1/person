'use strict';

const { Person } = require('../models');
const dataPerson = require('../constans/person');

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await Promise.all(dataPerson.map(async data => {
     try {
       await Person.findOrCreate({
         where: data,
         defaults: data
       });
     } catch (error) {
       console.log(error);
     }
   }))
  },

  down: async (queryInterface, Sequelize) => {
   
    await queryInterface.bulkDelete('Person', null, {});
  }
};
