module.exports = (sequelize, DataTypes) => {
    const pedidoproduto = sequelize.define('Pedidoproduto', {
        idpedidos_produtos: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idpedidos: {
            type: DataTypes.INTEGER,
            references: {
                model: 'pedidos',
                key: 'idpedidos'
            }
        },
        idprodutos: {
            type: DataTypes.INTEGER,
            references: {
                model: 'produtos',
                key: 'idprodutos'
            }
        }
    }, {
        tableName: "pedidos_has_produtos"
    });
    return pedidoproduto
}