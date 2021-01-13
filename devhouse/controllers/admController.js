
const { sequelize, Produto, Categoria, Adm } = require('../models');
const {check, validationResult, body }=require('express-validator');
const bcrypt = require('bcrypt');
const Sequelize = require("sequelize");
const Op = Sequelize.Op
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
        console.log(produto)
        res.send(produto)
    },
    storeProduct: async (req, res) => {
        console.log(req.body)

        var { codigo, nome, preco, quantidade,  description , tamanho, hexcolor, colorname, categoria, subcategoria } = req.body
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
            id_produtos_categorias: idcategorias,
            description: description
        })

        res.redirect('/adm/cadastrarproduto')
    },
    adm: (req,res)=>{
        res.render('admoptions',{title:'AdmOptions', user:req.session.admuser})
    },
    logar: (req,res)=>{
        let erros= validationResult(req)
        if(erros.errors.length != 0){
            res.render('login_adm',{title:'login', errors:erros.errors})
        }else{
            req.session.admuser=req.body.user
            res.render('admoptions',{title: 'AdmOptions', user:req.body.user})
        }

       
    },
    cadastro: (req,res)=>{
        res.render('cadastro_adm',{title:'cadastro'})
    },
    cadastrar: async (req,res)=>{
        let erros= validationResult(req)
        //console.log(req.body)
        if(erros.errors.length != 0){
            console.log(erros.errors)
            res.render('cadastro_adm',{title:'cadastro', errors:erros.errors})

        }else{
        
        await Adm.create({
            usuario: req.body.user,
            email:req.body.email,
            senha:bcrypt.hashSync(req.body.senha,5)
        })
        res.render('cadastro_adm',{title:'cadastro', sucess:true})

        }
        

        
    },
    deslogar: (req,res)=>{
        req.session.admuser = undefined
        res.render('login_adm',{title: 'login'})
    },
    editProduct: async (req,res)=>{
        var  {count:total,rows:produtos} = await Produto.findAndCountAll({
            where: {                
                tamanho: req.query.tamanho ? req.query.tamanho : { [Op.or]: [{ [Op.ne]: 1 }, null] },
                cor: req.query.cor ? req.query.cor : { [Op.ne]: 1 },
                desconto: req.query.desconto ? { [Op.lte]: Number(req.query.desconto) } : { [Op.or]: [{ [Op.gte]: 0 }, null] },
                preco: req.query.range?{ [Op.lte]: Number(req.query.range) }: { [Op.ne]: 'a' },
            },
            order:req.query.ordem?ordenacao(req.query.ordem):[['nome','ASC']],
            limit:6,
            offset: req.query.page? (Number(req.query.page)-1)*6:0
        })

        
        console.log(produtos.map(p => p.dataValues))
        var totalPage=Math.ceil(total/6)
        console.log(totalPage)


        var infos = {
            activePage: req.query.page? Number(req.query.page):1,
            totalPages:totalPage,
            order: req.query.ordem?req.query.ordem:"alfabetica",
            filtro: req.query,
            title: 'Editar Produtos',
            produtos: produtos.map(p => p.dataValues),
        }
        res.render('editprodutoshome',infos)
    },
    searchedit: async (req,res)=>{
        var query = req.query.q
        console.log(query)
        var {count:total,rows:produtos} = await Produto.findAndCountAll({
            where: {
                [Op.or]: [{ "nome": { [Op.substring]: query } }, { "codigo": { [Op.substring]: query } }]
            },
            order:req.query.ordem?ordenacao(req.query.ordem):[['nome','ASC']],
            limit:6,
            offset: req.query.page? (Number(req.query.page)-1)*6:0
        })

        console.log(total)
        var totalPage=Math.ceil(total/6)
        console.log(totalPage)
        var infos = {
            activePage: req.query.page? Number(req.query.page):1,
            totalPages:totalPage,
            order: req.query.ordem?req.query.ordem:"alfabetica",
            filtro: req.query,
            title: 'Editar Produtos',
            produtos: produtos.map(p => p.dataValues),
        }
        res.render('editprodutoshome',infos)

    },
    editProductById: async (req,res)=>{
            var id = req.params.id

            var produto = await Produto.findOne({
                include: 'categorias',
                where: {
                    idprodutos:id
                }
            })
            var produtos = await Produto.findAll({
                include: 'categorias'
            })
            var cor = []
            var categorias = []
            var subcategorias = []
            produtos.forEach(prod => {
                cor.push({ 
                    color: (prod.dataValues.cor),
                    hexcolor: (prod.dataValues.hexcor)
                })
                categorias.push(prod.dataValues.categorias.dataValues.categoria)
                subcategorias.push(prod.dataValues.categorias.dataValues.subcategoria)
            });
            produto=JSON.parse(JSON.stringify(produto))
            console.log(produto)
            var infos = {
                title: 'Editar Produto',
                produto:produto,
                cor: cor.filter((v, i, a) => a.findIndex(t => (t.color === v.color && t.hexcolor === v.hexcolor)) === i),
                categorias: [...new Set(categorias)],
                subcategorias: [...new Set(subcategorias)]
            }

            res.render('editarProduto',infos)
        },
        saveEdits: async (req,res)=>{
            console.log(req.body)
            var { codigo, nome, preco, quantidade, desconto, description, hexcolor, colorname, categoria, subcategoria } = req.body
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
            //tamanho = tamanho == 'NULL' ? null : tamanho
            console.log(typeof(desconto))
            desconto=typeof(desconto)=='number'?desconto:null

    
            var idcategorias = await Categoria.findAll({
                where: {
                    categoria: categoria,
                    subcategoria: subcategoria
                }
            })
    
    
            if (idcategorias.length == 0) {
                var result = await Categoria.create({
                    categoria: categoria,
                    subcategoria: subcategoria
                })
                idcategorias = result.dataValues.idcategorias
            } else {
                idcategorias = idcategorias[0].dataValues.idcategorias
            }
    
            var img
            if(req.body.image.indexOf('/images/produtos/')>-1){
                img=req.body.image
            }else{
                img = '/images/produtos/' + req.body.image;
            }
            console.log(description)

            if(req.body.aplicartodos){
                Produto.update({
                    nome: nome,
                    preco: Number(preco),
                    imagem: img,
                    quantidade: Number(quantidade),
                    desconto: desconto,
                    description:description,
                    cor: colorname,
                    hexcor: hexcolor,
                    id_produtos_categorias: idcategorias
                },{
                    where:{
                        codigo: req.body.codigo
                    }
                })

            }else{
                Produto.update({
                    nome: nome,
                    preco: Number(preco),
                    imagem: img,
                    quantidade: Number(quantidade),
                    desconto: desconto,
                    description:description,
                    cor: colorname,
                    hexcor: hexcolor,
                    id_produtos_categorias: idcategorias
                },{
                    where:{
                        idprodutos: req.body.id
                    }
                })
            }
            res.render('redirectpage',{title:'redirect'})
        },
        deleteProduct: async (req,res)=>{
            await Produto.destroy({
                where:{idprodutos:req.params.id}
            })
            //res.redirect('../editarproduto')

        }

}


module.exports = admController
