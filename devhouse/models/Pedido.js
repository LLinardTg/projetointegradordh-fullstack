module.exports = (sequelize, DataTypes) => {
    const pedido = sequelize.define('Pedido', {
        idpedidos: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        total: DataTypes.DECIMAL,
        data: DataTypes.DATEONLY,
        frete: DataTypes.DECIMAL,
        status: DataTypes.STRING,
        idclientes: {
            type: DataTypes.INTEGER,
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