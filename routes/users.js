const routerUsers = require('express').Router();
// eslint-disable-next-line object-curly-newline
const { getUsers, createUser, updateUser, updateAvatar, getUserID } = require('../controllers/controllerUser');


routerUsers.get('/', getUsers);

routerUsers.get('/:_id', getUserID);

routerUsers.post('/', createUser);

routerUsers.patch('/me', updateUser);

routerUsers.patch('/me/avatar', updateAvatar);

module.exports = routerUsers;
