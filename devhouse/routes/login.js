const { sequelize, Log , Adm} = require('../models');
var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginController')
const multer = require('multer');
const { check, validationResult, body } = require('express-validator')
const bcrypt =require('bcrypt')
const authUsuario = require('../middlewares/authUsuario')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/produtos')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage })


router.get('/login', authUsuario,loginController.logar);
router.post('/login', [
    body('user').custom(async (value) => {
        if (value != '') {
            var exists = await Adm.findOne({
                where: {
                    usuario: value
                }
            })
            if (exists != null) {
                return value
            } else {
                throw new Error("Usuario não existente!");
            }
        } else {
            throw new Error("Inserir um usuário!");
        }


    }),
    check("senha")
    .custom(async (value, { req, loc, path }) => {
        if (value != '') {

            var exists = await Adm.findOne({
                where: {
                    usuario: req.body.user
                }
            })

            if(exists != null ){
                if(bcrypt.compareSync(value,exists.dataValues.senha)){
                    return value
                }else{
                    throw new Error("Senhas Incorreta!");
                }
                
            }
        }
    })

],loginController.logar);



module.exports = router;