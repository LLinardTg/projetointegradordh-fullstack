var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'HOME' });
});

router.get('/produtos/:categoria?/:subcategoria?', indexController.loadAllProducts);
router.get('/buscar', indexController.busca);
router.get('/categoriesload', indexController.loadAllCategories);
router.get('/produto/:codigo', indexController.loadProductById);
router.post('/checkout', indexController.checkout);

/* GET home page. */
router.get('/checkout', function(req, res, next) {
    res.render('carrinho', { title: 'carrinho' });
});

module.exports = router;