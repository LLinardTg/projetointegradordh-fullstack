module.exports = (sequelize, DataTypes)=>{
    const categoria = sequelize.define('Categoria',{
        idcategorias:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        categoria:DataTypes.STRING,
        subcategoria:DataTypes.STRING
    },{
        tableName:'categorias'
    })

    categoria.associate =(models) =>{
        categoria.hasMany(models.Produto,{foreignKey:'id_produtos_categorias',as:'produtos'})
    }

    return categoria
}