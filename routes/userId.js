const routerUser = require('express').Router();
const { getUserID } = require('../controllers/controllerUser');

// eslint-disable-next-line consistent-return
routerUser.get('/:_id', getUserID);

module.exports = routerUser;
