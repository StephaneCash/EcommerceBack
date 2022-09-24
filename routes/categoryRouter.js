const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
//const auth = require('../auth/auth');

router.post('/', categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.delteCategory);

module.exports = router;