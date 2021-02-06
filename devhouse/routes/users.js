const { sequelize, Log, Adm, Cliente } = require('../models');
var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginController')
const multer = require('multer');
const { check, validationResult, body } = require('express-validator')
const bcrypt = require('bcrypt')
const authUsuario = require('../middlewares/authUsuario')
const userController = require('../controllers/userController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/produtos')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage })


router.get('/login', authUsuario, loginController.logar);
router.post('/login', [
    body('user').custom(async(value) => {
        if (value != '') {
            var exists = await Cliente.findOne({
                where: {
                    email: value
                }
            })
            if (exists != null) {
                return value
            } else {
                throw new Error("Usuário e/ou senha incorretos!");
            }
        } else {
            throw new Error("Inserir um usuário!");
        }


    }),
    check("senha")
    .custom(async(value, { req, loc, path }) => {
        if (value != '') {

            var exists = await Cliente.findOne({
                where: {
                    email: req.body.user
                }
            })

            if (exists != null) {
                if (bcrypt.compareSync(value, exists.dataValues.senha)) {
                    return value
                } else {
                    throw new Error("Usuário e/ou senha incorretos!");
                }

            }
        }
    })

], loginController.logar);

router.get('/cadastrar', userController.cadastro);
router.post('/cadastrar', [
    body('email').custom(async(value) => {
        if (value != '') {
            var exists = await Cliente.findOne({
                where: {
                    email: value
                }
            })
            if (exists != null) {
                throw new Error("Email já existente!");
            } else {
                return value
            }
        } else {
            throw new Error("Inserir um email!");
        }


    }),
    check('email').isEmail().withMessage("Favor inserir um email válido"),
    check("senha",
        "A senha tem que ter no mínimo 6 caracteres")
    .isLength({ min: 6 })
    .custom((value, { req, loc, path }) => {
        if (value != '') {
            if (value != req.body.senhaconfirm) {
                // trow error if passwords do not match
                throw new Error("Senhas diferentes!");
            } else {
                return value;
            }
        }
    }),
    body('cpf').custom(async(value) => {
        if (value != '') {
            var exists = await Cliente.findOne({
                where: {
                    cpf: value
                }
            })
            if (exists != null) {
                throw new Error("CPF já existente!");
            } else {
                return value
            }
        } else {
            throw new Error("Inserir um CPF!");
        }


    }),
    check('cpf').isLength({ min: 11 }).withMessage("O CPF deve ter  11 números!"),
    check('user').isLength({ min: 1 }).withMessage("Favor inserir um Nome!"),
    check('cep').isLength({ min: 7 }).withMessage("Favor inserir um cep válido!"),
    check('endereco').isLength({ min: 1 }).withMessage("Favor inserir um Endereço!"),
    check('cidade').isLength({ min: 1 }).withMessage("Favor inserir uma Cidade!"),
    check('estado').isLength({ min: 1 }).withMessage("Favor inserir um Estado!"),
    check('telefone').isLength({ min: 1 }).withMessage("Favor inserir um telefone!")

], userController.cadastrar);

router.get('/logout', authUsuario, userController.deslogar);



module.exports = router;