const { sequelize, Adm } = require('../models');
var express = require('express');
var router = express.Router();
const admController = require('../controllers/admController')
const multer = require('multer');
const { check, validationResult, body } = require('express-validator')
const bcrypt =require('bcrypt')
const authadm = require('../middlewares/authadm')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/produtos')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage })


router.get('/', authadm,admController.adm);
router.post('/', [
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

],admController.logar);
router.get('/cadastrar', authadm, admController.cadastro);
router.post('/cadastrar', authadm, [
body('user').custom(async (value) => {
        if (value != '') {
            var exists = await Adm.findOne({
                where: {
                    usuario: value
                }
            })
            if (exists != null) {
                throw new Error("Usuario já existente!");
            } else {
                return value
            }
        } else {
            throw new Error("Inserir um usuário!");
        }


    }),
    check('email').isEmail().withMessage("Favor inserir um email válido"),
    body('email').custom(async (value) => {
        if (value != '') {
            var exists = await Adm.findOne({
                where: {
                    email: value
                }
            })
            if (exists != null)  {
                throw new Error("Email já existente!");
            } else {
                return value
            }
        }

    }),
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
        })
    
], admController.cadastrar);
router.get('/cadastrarproduto', authadm, admController.createProduct);
router.post('/cadastrarproduto', upload.any(), admController.storeProduct);
router.get('/produto/:codigo', admController.loadProduct);
router.get('/editarproduto', authadm, admController.editProduct);
router.get('/buscarproduto', authadm, admController.searchedit);
router.get('/deslogar', authadm, admController.deslogar);
router.get('/editarproduto/:id', authadm, admController.editProductById)
router.get('/deletarproduto/:id', authadm, admController.deleteProduct)
router.post('/editarproduto/salvar',  upload.any(), admController.saveEdits)



module.exports = router;