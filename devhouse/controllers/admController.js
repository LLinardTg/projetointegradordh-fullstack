
const { sequelize, Produto, Categoria } = require('../models');
const admController = {
    createProduct: async (req, res) => {

        var produtos = await Produto.findAll({ include: 'categorias' })
        var codigo = []
        var cor = []
        var categorias = []
        var subcategorias = []
        produtos.forEach(prod => {
            codigo.push(prod.dataValues.codigo)
            cor.push({ 
                color: (prod.dataValues.cor),
                hexcolor: (prod.dataValues.hexcor)
            })
            categorias.push(prod.dataValues.categorias.dataValues.categoria)
            subcategorias.push(prod.dataValues.categorias.dataValues.subcategoria)
        });
        var infos = {
            title: 'Cadastrar Produto',
            codigo: [...new Set(codigo)],
            cor: cor.filter((v, i, a) => a.findIndex(t => (t.color === v.color && t.hexcolor === v.hexcolor)) === i),
            categorias: [...new Set(categorias)],
            subcategorias: [...new Set(subcategorias)]
        }
        console.log(infos)
        res.render('cadastroProduto', infos)
        // var produtos =await produto.findAll()
        // console.log(produtos)
    },
    loadProduct: async (req, res) => {
        var codigo = req.params.codigo
        var produto = await Produto.findOne({
            include: 'categorias',
            where: {
                codigo: codigo
            }
        })
        res.send(produto)


    },
    storeProduct: async (req, res) => {
        console.log(req.body)

        var { codigo, nome, preco, quantidade, tamanho, hexcolor, colorname, categoria, subcategoria } = req.body
        codigo = typeof (codigo) == 'string' ? codigo : codigo[1]
        nome = typeof (nome) == 'string' ? nome : nome[1]
        categoria = typeof (categoria) == 'string' ? categoria : categoria[0]
        subcategoria = typeof (subcategoria) == 'string' ? subcategoria : subcategoria[0]
        if (typeof (colorname) != 'string') {
            colorname = colorname[1]
            console.log(colorname)
            hexcolor = await Produto.findOne({
                where: {
                    cor: colorname
                }
            })
            hexcolor=hexcolor.dataValues.hexcor
        }
        tamanho = tamanho == 'NULL' ? null : tamanho

        var idcategorias = await Categoria.findAll({
            where: {
                categoria: categoria,
                subcategoria: subcategoria
            }
        })

        console.log(idcategorias)

        if (idcategorias.length == 0) {
            var result = await Categoria.create({
                categoria: categoria,
                subcategoria: subcategoria
            })
            idcategorias = result.dataValues.idcategorias
        } else {
            idcategorias = idcategorias[0].dataValues.idcategorias
        }

        let img = '/images/produtos/' + req.body.image;

        await Produto.create({
            codigo: codigo,
            nome: nome,
            preco: Number(preco),
            imagem: img,
            quantidade: Number(quantidade),
            tamanho: tamanho,
            cor: colorname,
            hexcor: hexcolor,
            id_produtos_categorias: idcategorias
        })

        res.redirect('/adm/cadastrarproduto')
    }
}


module.exports = admController
