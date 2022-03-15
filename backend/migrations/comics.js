'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comics', {
      nombre: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      autor: {
        type: Sequelize.STRING
      },
      imagen: {
        type: Sequelize.STRING
      },
      tienda: {
        type: Sequelize.STRING
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