'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      precio: {
        type: Sequelize.STRING
      },
      autor: {
        type: Sequelize.STRING
      },
      personaje: {
        type: Sequelize.STRING
      },
      imagen: {
        type: Sequelize.STRING
      },
      nombre_tienda: {
        type: Sequelize.STRING,
        onDelete: "cascade",
        reference:{
          model:"tiendas",
          key:"nombre",
          as: "nombreTienda"
        }
      },
      enlace: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comics');
  }
};