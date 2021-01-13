module.exports = (sequelize, DataTypes)=>{
    const log= sequelize.define('Log',{ 
        idlogs: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        acaoadmins:{
          type: Sequelize.TEXT,
          allowNull:false
        },
        idadmin:{
          type: Sequelize.INTEGER,
        }},{
        tableName:'logs'
    })


    log.associate = (models)=> {
        log.belongsTo(models.Adm,{foreignKey:'idadmin',as:'administrador'})
    }

    return log

}
