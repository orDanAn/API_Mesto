const routerUsers = require('express').Router();
const users = require('../data/users.json');

routerUsers.get('/', (req, res) => {
  res.send(users);
});

module.exports = routerUsers;
