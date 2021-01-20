module.exports = (sequelize, DataTypes) => {
    const cliente = sequelize.define('Cliente', {
        idclientes: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Telefone: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Endereco: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Senha: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        Cpf: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        DataNasc: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        sexo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Cep: {
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