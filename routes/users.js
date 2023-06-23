const routerUsers = require('express').Router();
const usersController = require('../controllers/users');
const { validateGetUserById, validateUpdateProfile, validateUpdateAvatar } = require('../middlewares/validate');

routerUsers.get('/me', usersController.getUserInfo);
routerUsers.get('/', usersController.getUsers);
routerUsers.get('/:userId', validateGetUserById, usersController.getUserById);
routerUsers.patch('/me', validateUpdateProfile, usersController.updateProfile);
routerUsers.patch('/me/avatar', validateUpdateAvatar, usersController.updateAvatar);

module.exports = routerUsers;
