const routerCard = require('express').Router(); // создали роутер

const { celebrate, Joi } = require('celebrate');
// eslint-disable-next-line object-curly-newline
const { getCards, delCardID, createCard, likeCard, dislikeCard } = require('../controllers/controllerCard'); // данные нужны для роутинга, поэтому импортируем их

routerCard.get('/', getCards);

routerCard.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }),
}), delCardID);

routerCard.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/^(?:(?:https?|HTTPS?|ftp|FTP):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))\.?)(?::\d{2,})?(?:[/?#]\S*)?$/),
  }),
}), createCard);

routerCard.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }),
}), likeCard);

routerCard.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }),
}), dislikeCard);

module.exports = routerCard; // экспортировали
