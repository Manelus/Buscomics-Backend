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
      comics.belongsTo(models.tiendas,{
        foreignKey: "nombre_Tienda",
        onDelete:"cascade"
      })
    }
  }
  comics.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombre: {
      type: DataTypes.STRING
    },
    precio: {
      type: DataTypes.STRING
    },
    autor: {
      type: DataTypes.STRING
    },
    personaje: {
      type: DataTypes.STRING
    },
    imagen: {
      type: DataTypes.STRING
    },
    nombre_tienda: {
      type: DataTypes.STRING
    },
    enlace: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'comics',
  });
  return comics;
};