module.exports = (sequelize, DataTypes) => {
    const favorito = sequelize.define('Favorito', {
        idfavoritos: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idpedidos: {
            type: Sequelize.INTEGER,
        },
        idprodutos: {
            type: Sequelize.INTEGER,
        }
    }, {
        tableName: "favoritos"
    });
    return favorito
}
