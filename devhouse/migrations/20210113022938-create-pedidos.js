'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('pedidos', {
      idpedidos: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      total: Sequelize.DECIMAL,
      data: Sequelize.DATEONLY,
      frete: Sequelize.DECIMAL,
      status: Sequelize.STRING,
      idclientes: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clientes',
          key: 'idclientes'
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
    await queryInterface.dropTable('pedidos');
  }
};
