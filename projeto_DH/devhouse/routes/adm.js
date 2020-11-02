var express = require('express');
var router = express.Router();
const admController = require('../controllers/admController')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, 'public/images/produtos')
    },
    filename:(req,file, cb) => {
        cb(null, file.originalname)
    }
}); 
const upload = multer({ storage })

router.get('/cadastrarproduto', admController.createProduct );
router.post('/cadastrarproduto', upload.any(), admController.storeProduct );
router.get('/produto/:codigo', admController.loadProduct );


module.exports = router;