'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('pedidos_has_produtos', { 
      idpedidos_produtos: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      idpedidos: {
        type: Sequelize.INTEGER,
        references: {
          model: 'pedidos',
          key: 'idpedidos'
        }
      },
      idprodutos: {
        type: Sequelize.INTEGER,
        references: {
          model: 'produtos',
          key: 'idprodutos'
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

    await queryInterface.dropTable('pedidos_has_produtos');
  }
};
