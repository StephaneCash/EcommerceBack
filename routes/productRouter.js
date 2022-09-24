const router = require('express').Router();
const productController = require('../controllers/productController');
//const auth = require('../auth/auth');

router.post('/', productController.productCreate);
router.get('/', productController.getAllProducts);
router.put('/:id', productController.updateProduct);

router.get('/:id', productController.getOneProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;