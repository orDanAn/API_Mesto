const routerUsers = require('express').Router();

const { celebrate, Joi } = require('celebrate');
// eslint-disable-next-line object-curly-newline
const { getUsers, updateUser, updateAvatar, getUserID } = require('../controllers/controllerUser');


routerUsers.get('/users/', getUsers);

routerUsers.get('/users/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }),
}), getUserID);

routerUsers.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

routerUsers.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/^(?:(?:https?|HTTPS?|ftp|FTP):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))\.?)(?::\d{2,})?(?:[/?#]\S*)?$/),
  }),
}), updateAvatar);

module.exports = routerUsers;
