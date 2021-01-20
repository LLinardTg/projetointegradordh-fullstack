module.exports = (sequelize, DataTypes) => {
    const log = sequelize.define('Log', {
        idlogs: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        acaoadmins: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        idadmin: {
            type: DataTypes.INTEGER,
        }
    }, {
        tableName: 'logs'
    })


    log.associate = (models) => {
        log.belongsTo(models.Adm, { foreignKey: 'idadmin', as: 'administrador' })
    }

    return log

}