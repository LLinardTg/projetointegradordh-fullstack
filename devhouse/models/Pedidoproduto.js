module.exports = (sequelize, DataTypes) => {
    const pedidoproduto = sequelize.define('Pedidoproduto', {
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
        }
    }, {
        tableName: "pedidos_has_produtos"
    });
    return pedidoproduto
}
