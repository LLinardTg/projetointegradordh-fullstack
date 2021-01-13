'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('logs', { 
      idlogs: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      acaoadmins:{
        type: Sequelize.TEXT,
        allowNull:false
      },
      idadmin:{
        type: Sequelize.INTEGER,
        references: {
          model: 'admins',
          key: 'idadmin'
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
     });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('logs');
  }
};
