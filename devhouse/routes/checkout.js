var express = require('express');
var router = express.Router();
var indexController=require('../controllers/indexController')

/* GET home page. */
router.get('/checkout', function(req, res, next) {
  res.render('index', { title: 'HOME' });
});