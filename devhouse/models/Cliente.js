module.exports = (sequelize, DataTypes) => {
    const cliente = sequelize.define('Cliente', {
        idclientes: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefone: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        endereco: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senha: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        cpf: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cep: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        tableName: 'clientes'
    })

    cliente.associate = (models) => {
        cliente.hasMany(models.Pedido, { foreignKey: 'idclientes', as: 'pedidos' })
    }

    return cliente

}