const routerCard = require('express').Router(); // создали роутер
// eslint-disable-next-line object-curly-newline
const { getCards, delCardID, createCard, likeCard, dislikeCard } = require('../controllers/controllerCard'); // данные нужны для роутинга, поэтому импортируем их

routerCard.get('/', getCards);

routerCard.delete('/:_id', delCardID);

routerCard.post('/', createCard);

routerCard.put('/:cardId/likes', likeCard);

routerCard.delete('/:cardId/likes', dislikeCard);

module.exports = routerCard; // экспортировали
