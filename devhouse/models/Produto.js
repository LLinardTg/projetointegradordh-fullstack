module.exports = (sequelize, DataTypes) => {
    const produto = sequelize.define('Produto', {
        idprodutos: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        codigo: DataTypes.STRING,
        nome: DataTypes.STRING,
        preco: DataTypes.DECIMAL,
        imagem: DataTypes.STRING,
        quantidade: DataTypes.INTEGER,
        tamanho: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cor: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hexcor: {
            type: DataTypes.STRING,
            allowNull: true
        },
        desconto: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        id_produtos_categorias: DataTypes.INTEGER,
        description: DataTypes.TEXT
    }, {
        tableName: 'produtos'
    })

    produto.associate = (models) => {
        produto.belongsTo(models.Categoria, { foreignKey: 'id_produtos_categorias', as: 'categorias' })
        produto.belongsToMany(models.Pedido, { through: 'Pedidoproduto', foreignKey: 'idprodutos', as: 'pedidos' })
    }


    return produto
}