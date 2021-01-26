module.exports = (sequelize, DataTypes) => {
    const favorito = sequelize.define('Favorito', {
        idfavoritos: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idclientes: {
            type: DataTypes.INTEGER,
        },
        idprodutos: {
            type: DataTypes.INTEGER,
        }
    }, {
        tableName: "favoritos"
    });
    return favorito
}