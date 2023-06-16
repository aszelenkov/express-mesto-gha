const routerUser = require('express').Router();
const usersController = require('../controllers/users');

routerUser.get('/', usersController.getUsers);
routerUser.get('/:userId', usersController.getUserById);
routerUser.post('/', usersController.createUser);
routerUser.patch('/me', usersController.updateProfile);
routerUser.patch('/me/avatar', usersController.updateAvatar);

module.exports = routerUser;
