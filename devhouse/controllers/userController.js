const { Cliente } = require('../models');
const {check, validationResult, body }=require('express-validator');
const bcrypt = require('bcrypt');
const Sequelize = require("sequelize");
const Op = Sequelize.Op
const userController = {

    cadastro: (req,res)=>{
        res.render('cadastroUsuario',{title:'cadastro'})
    },
    cadastrar: async (req,res)=>{
        let erros= validationResult(req)
        //console.log(req.body)
        if(erros.errors.length != 0){
            console.log(erros.errors)
            res.render('cadastroUsuario',{title:'cadastro', errors:erros.errors})

        }else{
        
        await Cliente.create({
            nomeUsuario: req.body.nomeUsuario,
            email: req.body.email,
            senha:bcrypt.hashSync(req.body.senha,5),
            cpf: req.body.cpf,
            cep: req.body.cep,
            endereco: req.body.endereco,
            cidade:req.body.cidade,
            estado: req.body.estado
            
        })
        res.render('cadastroUsuario',{title:'cadastro', sucess:true})

        }
        

        
    },
    deslogar: (req,res)=>{
        req.session.loginUser = undefined
        res.render('login_usuario',{title: 'login'})
    },

}


module.exports = userController
