const router = require('express').Router();
const loginController = require('../controllers/LoginUser');

router.post('/', loginController.login);

module.exports = router;