var express = require('express');
var router = express.Router();
const UsersController = require('../controllers/users')

/* GET users listing. */
router.get('/:type', UsersController.getUsers);
router.post('/create', UsersController.createUsers);
router.post('/sign-in', UsersController.signInUser)



module.exports = router;
