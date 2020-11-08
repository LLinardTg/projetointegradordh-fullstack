const { sequelize, Produto, Categoria } = require('../models');
const Sequelize = require("sequelize");
const Op = Sequelize.Op

function ordenacao(ordem){
    if(ordem=="alfabetica"){
        return [['nome','ASC']]
    }else if(ordem=="maior"){
        return [['preco','DESC']]
    }else if(ordem=="menor"){
        return [['preco','ASC']]
    }
}



indexController = {
    loadAllCategories: async (req, res) => {
        var categorias = await Categoria.findAll();
        res.send(categorias)

    },
    loadAllProducts: async (req, res) => {
        var  {count:total,rows:produtos} = await Produto.findAndCountAll({
            include: {
                association: 'categorias',
                where: {
                    categoria: req.params.categoria ? req.params.categoria : { [Op.ne]: 1 },
                    subcategoria: req.params.subcategoria ? req.params.subcategoria : { [Op.ne]: 1 },
                }
            },
            where: {
                tamanho: req.query.tamanho ? req.query.tamanho : { [Op.or]: [{ [Op.ne]: 1 }, null] },
                cor: req.query.cor ? req.query.cor : { [Op.ne]: 1 },
                desconto: req.query.desconto ? { [Op.lte]: Number(req.query.desconto) } : { [Op.or]: [{ [Op.gte]: 0 }, null] },
                preco: req.query.range?{ [Op.lte]: Number(req.query.range) }: { [Op.ne]: 'a' },
            },
            attributes: ['nome', 'preco', 'imagem', 'codigo'],
            group: ['nome', 'preco', 'imagem', 'codigo', 'id_produtos_categorias'],
            order:req.query.ordem?ordenacao(req.query.ordem):[['nome','ASC']],
            limit:12,
            offset: req.query.page? (Number(req.query.page)-1)*12:0
        })
        
        var totalPage=Math.ceil(total.length/12)
        var color = await Produto.findAll({ 
            attributes: ['cor', 'hexcor'],
            group: ["cor", "hexcor"]
        })
        if(req.params.subcategoria ){
            var title = req.params.subcategoria 
            var categoriasToSelect = [...new Set(produtos.map(p => p.dataValues.categorias).map(c => c.subcategoria))]
            var route = "/produtos/"+req.params.categoria+"/"+req.params.subcategoria
        }else if(req.params.categoria ){
            var title = req.params.categoria 
            var categoriasToSelect = [...new Set(produtos.map(p => p.dataValues.categorias).map(c => c.subcategoria))]
            var route="/produtos/"+req.params.categoria
        }else{
            var title="Produtos"
            var categoriasToSelect = [...new Set(produtos.map(p => p.dataValues.categorias).map(c => c.categoria))]
            var route="/produtos"
        }


        var infos = {
            route:route,
            activePage: req.query.page? Number(req.query.page):1,
            totalPages:totalPage,
            order: req.query.ordem?req.query.ordem:"alfabetica",
            filtro: req.query,
            title: title,
            produtos: produtos.map(p => p.dataValues),
            categorias: categoriasToSelect,
            color: color.map(c => c.dataValues)
        }
        console.log(infos)
        res.render('produtos', infos)

    },
    busca: async (req, res) => {
        var query = req.query.q
        console.log(query)
        var produtos = await Produto.findAll({
            where: {
                [Op.or]: [{ "nome": { [Op.like]: query } }, { "cor": { [Op.like]: query } }, { "tamanho": { [Op.like]: query } }]
            },
            attributes: ['nome', 'preco', 'imagem', 'codigo'],
            group: ['nome', 'preco', 'imagem', 'codigo'],
            order:req.query.ordem?ordenacao(req.query.ordem):[['nome','ASC']],
            limit:12,
            offset: req.query.page? (Number(req.query.page)-1)*12:0
        })
        var categorias = await Categoria.findAll({
            attributes: ['categoria'],
            group: ["categoria"]
        });
        var color = await Produto.findAll({
            attributes: ['cor', 'hexcor'],
            group: ["cor", "hexcor"]
        })
        var infos = {
            filtro: req.query,
            order: req.query.ordem?req.query.ordem:"alfabetica",
            title: "Produtos",
            produtos: produtos.map(p => p.dataValues),
            categorias: categorias.map(c => c.dataValues),
            color: color.map(c => c.dataValues)
        }
        res.render('produtos', infos)
    }

}

module.exports = indexController