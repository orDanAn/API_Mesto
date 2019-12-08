/* eslint-disable no-underscore-dangle */
const Card = require('../models/card');

function getCards(req, res) {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
}

function delCardID(req, res) {
  Card.findById(req.params._id)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!(card.owner.toString() === req.user._id.toString())) {
        return res.status(403).send({ message: 'это карта не Выша, её нельзя удалить' });
      }
      Card.findByIdAndRemove(req.params._id)
        .then((cardDel) => {
          if (!cardDel) {
            return res.send({ message: 'нет карты с таким ID' });
          }
          return res.send({ data: cardDel });
        })
        .catch((err) => res.status(500).send({ message: err.message }));
    })
    .catch((err) => {
      if (err.message.indexOf('Cast to ObjectId failed for value') === 0 || err.message.indexOf('Cannot read property') === 0) {
        return res.status(404).send({ massege: 'не правильно указан ID' });
      }
      return res.status(500).send({ message: err.message });
    });
}

function createCard(req, res) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
}

function likeCard(req, res) {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'нет карты с таким ID' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.message.indexOf('Cast to ObjectId failed for value') === 0 || err.message.indexOf('Cannot read property') === 0) {
        return res.status(404).send({ massege: 'не правильно указан ID' });
      }
      return res.status(500).send({ message: err.message });
    });
}

function dislikeCard(req, res) {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'нет карты с таким ID' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.message.indexOf('Cast to ObjectId failed for value') === 0 || err.message.indexOf('Cannot read property') === 0) {
        return res.status(404).send({ massege: 'не правильно указан ID' });
      }
      return res.status(500).send({ message: err.message });
    });
}

module.exports = {
  getCards, delCardID, createCard, likeCard, dislikeCard,
};
