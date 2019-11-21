const routerUsers = require('express').Router();
// eslint-disable-next-line object-curly-newline
const { getUsers, createUser, updateUser, updateAvatar } = require('../controllers/controllerUser');


routerUsers.get('/', getUsers);

routerUsers.post('/', createUser);

routerUsers.patch('/me', updateUser);

routerUsers.patch('/me/avatar', updateAvatar);

module.exports = routerUsers;
