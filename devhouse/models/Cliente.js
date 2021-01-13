module.exports = (sequelize, DataTypes)=>{
    const cliente = sequelize.define('Cliente', {
        idclientes: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        Nome:{
          type:Sequelize.STRING,
          allowNull:false
        },
        Telefone: {
          type:Sequelize.INTEGER,
          allowNull:false
        },
        Endereco:{
          type: Sequelize.TEXT,
          allowNull: false
        },
        Email: {
          type:Sequelize.STRING,
          allowNull: false
        },
        Senha:{
          type:Sequelize.STRING(256),
          allowNull: false
        },
        Cpf: {
          type: Sequelize.INTEGER,
          allowNull:false
        },
        DataNasc:{
          type:Sequelize.DATEONLY,
          allowNull:false
        }, 
        sexo: {
          type:Sequelize.STRING,
          allowNull:false},
        Cep: {
          type:Sequelize.INTEGER,
          allowNull:false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      },{
        tableName:'clientes'
    })

    cliente.associate =(models) =>{
      cliente.hasMany(models.Pedido,{foreignKey:'idclientes',as:'pedidos'})
  }

    return cliente

}