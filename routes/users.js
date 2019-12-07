const routerUsers = require('express').Router();
// eslint-disable-next-line object-curly-newline
const { getUsers, createUser, updateUser, updateAvatar, getUserID, login } = require('../controllers/controllerUser');


routerUsers.get('/users/', getUsers);

routerUsers.get('/users/:_id', getUserID);

routerUsers.patch('/users/me', updateUser);

routerUsers.patch('/users/me/avatar', updateAvatar);

routerUsers.post('/', login);

routerUsers.post('/signup', createUser);

module.exports = routerUsers;
