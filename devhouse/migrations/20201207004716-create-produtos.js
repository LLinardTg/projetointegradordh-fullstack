'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('produtos', {
      idprodutos:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      codigo: Sequelize.STRING,
      nome:Sequelize.STRING,
      preco:Sequelize.DECIMAL,
      imagem:Sequelize.STRING,
      quantidade: Sequelize.INTEGER,
      tamanho:{
          type: Sequelize.STRING,
          allowNull:true
      },
     cor:{
          type: Sequelize.STRING,
          allowNull:true
      },
      hexcor:{
          type: Sequelize.STRING,
          allowNull:true
      },
      desconto:{
          type: Sequelize.DECIMAL,
          allowNull:true
      },
      createdAt:Sequelize.DATE,
      updatedAt:Sequelize.DATE,
      id_produtos_categorias:{
        type:Sequelize.INTEGER,
        references:{
          model: 'categorias',
          key:'idcategorias'
        }}
  });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('produtos');
  }
};
