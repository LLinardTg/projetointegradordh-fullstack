var express = require('express');
var router = express.Router();
var indexController=require('../controllers/indexController')
var loginController=require('../controllers/loginController')
var userController=require('../controllers/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HOME' });
});

router.get('/produtos/:categoria?/:subcategoria?', indexController.loadAllProducts);
router.get('/buscar', indexController.busca);
router.get('/categoriesload', indexController.loadAllCategories);
router.get('/produto/:codigo', indexController.loadProductById);
router.get('/login', loginController.logar);

/* GET home page. */
router.get('/checkout', function(req, res, next) {
  res.render('carrinho', { title: 'carrinho' });
});

router.get('/users', function(req, res, next) {
  res.render('cadastrar', { title: 'cadastrar' });
});

module.exports = router;
