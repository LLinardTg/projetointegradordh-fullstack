module.exports = (sequelize, DataTypes) => {
    const favorito = sequelize.define('Favorito', {
        idfavoritos: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idpedidos: {
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