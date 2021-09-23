'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Person.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    name: DataTypes.STRING(128),
    age: DataTypes.INTEGER,
    gender: DataTypes.ENUM('female', 'male'),
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Person',
    tableName: 'Person'
  });
  return Person;
};