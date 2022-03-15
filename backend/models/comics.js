'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  comics.init({
    nombre: DataTypes.STRING,
    autor: DataTypes.STRING,
    imagen: DataTypes.STRING,
    tienda: DataTypes.STRING,
    enlace: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'comics',
  });
  return comics;
};