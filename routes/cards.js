const routerCard = require('express').Router(); // создали роутер
const card = require('../data/cards.json'); // данные нужны для роутинга, поэтому импортируем их

routerCard.get('/', (req, res) => {
  res.send(card);
});

module.exports = routerCard; // экспортировали
