module.exports = (sequelize, DataTypes) => {
  const pedido = sequelize.define('Pedido', {
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
    }

  }, {
    tableName: 'pedidos'
  })

  pedido.associate = (models) => {
    pedido.belongsTo(models.Cliente, { foreignKey: 'idclientes', as: 'pedidos' });

    pedido.belongsToMany(models.Produto, { through: 'Pedidoproduto', foreignKey: 'idprodutos', as: 'produtos' })

  }

  return pedido

}
