const { sequelize, Produto, Categoria, Adm } = require('../../models');
const fs =require('fs')

async function savedata(){

    var categorias = await Categoria.findAll()
    fs.writeFileSync("./categoria.json",JSON.stringify(categorias))

    var produtos= await Produto.findAll()
    fs.writeFileSync("./produto.json",JSON.stringify(produtos))

    var adms= await Adm.findAll()
    fs.writeFileSync("./adms.json",JSON.stringify(adms))

}

savedata()