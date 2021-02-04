const { Log } = require('../models');
const {check, validationResult, body }=require('express-validator');
const bcrypt = require('bcrypt');
const Sequelize = require("sequelize");
const Op = Sequelize.Op
const loginController = {

    adm: (req,res)=>{
        res.render('login',{title:'LoginOptions', user:req.session.loginUser})
    },
    logar: (req,res)=>{
        let erros= validationResult(req)
        if(erros.errors.length != 0){
            res.render('login',{title:'login', errors:erros.errors})
        }else{
            req.session.loginUser=req.body.user
            res.render('login',{title: 'LoginOptions', user:req.body.user})
        }

       
    },
    deslogar: (req,res)=>{
        req.session.loginUser = undefined
        res.render('login',{title: 'login'})
    },

}


module.exports = loginController
