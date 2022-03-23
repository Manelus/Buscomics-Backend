'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: 'admin',
          password: '$2b$10$wTgGMWGnzpEv3rGHgH3D4.4TvlKOoMDORxYkIOTYaDTjwC.jQ7YWm',
          email: 'admin@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  }
};
