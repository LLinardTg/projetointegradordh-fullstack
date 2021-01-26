const { sequelize, Produto, Categoria, Adm, Cliente, Favorito, Log, Pedido, Pedidoproduto } = require('../../models');
const fs =require('fs')

async function savedata(){

    var categorias = await Categoria.findAll()
    fs.writeFileSync("./categoria.json",JSON.stringify(categorias))

    var produtos= await Produto.findAll()
    fs.writeFileSync("./produto.json",JSON.stringify(produtos))

    var adms= await Adm.findAll()
    fs.writeFileSync("./adms.json",JSON.stringify(adms))

    var clientes=await Cliente.findAll()
    fs.writeFileSync("./clientes.json",JSON.stringify(clientes))

    var favoritos=await Favorito.findAll()
    fs.writeFileSync("./favoritos.json",JSON.stringify(favoritos))

    var log=await Log.findAll()
    fs.writeFileSync("./log.json",JSON.stringify(log))

    var pedidos=await Pedido.findAll()
    fs.writeFileSync("./pedidos.json",JSON.stringify(pedidos))

    var pedidoproduto=await Pedidoproduto.findAll()
    fs.writeFileSync("./pedidoproduto.json",JSON.stringify(pedidoproduto))

}

savedata().then(()=>console.log("sucess"))