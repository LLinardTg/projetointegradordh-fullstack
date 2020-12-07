'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('admins', {
      idadmin:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      usuario:Sequelize.STRING,
      email:Sequelize.STRING,
      senha:Sequelize.STRING(256),
      createdAt:Sequelize.DATE,
      updatedAt:Sequelize.DATE
  });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('admins')
  }
};
