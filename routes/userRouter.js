const router = require('express').Router();
const userController = require('../controllers/userController');
//const auth = require('../auth/auth');

router.post('/', userController.addUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getOneUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;