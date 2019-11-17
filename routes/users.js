const routerUsers = require('express').Router();
const { getUsers, createUser } = require('../controllers/controllerUser');


routerUsers.get('/', getUsers);

routerUsers.post('/', createUser);


module.exports = routerUsers;
