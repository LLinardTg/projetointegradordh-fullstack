'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('clientes', {
      idclientes: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Nome:{
        type:Sequelize.STRING,
        allowNull:false
      },
      Telefone: {
        type:Sequelize.INTEGER,
        allowNull:false
      },
      Endereco:{
        type: Sequelize.TEXT,
        allowNull: false
      },
      Email: {
        type:Sequelize.STRING,
        allowNull: false
      },
      Senha:{
        type:Sequelize.STRING(256),
        allowNull: false
      },
      Cpf: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      DataNasc:{
        type:Sequelize.DATEONLY,
        allowNull:false
      }, 
      sexo: {
        type:Sequelize.STRING,
        allowNull:false},
      Cep: {
        type:Sequelize.INTEGER,
        allowNull:false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('clientes');
  }
};
