module.exports = (sequelize, DataTypes)=>{
    const adm = sequelize.define('Adm',{
        idadmin:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuario:DataTypes.STRING,
        email:DataTypes.STRING,
        senha:DataTypes.STRING(256)
    },{
        tableName:'admins'
    })


    return adm
}