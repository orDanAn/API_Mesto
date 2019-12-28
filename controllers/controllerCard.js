/* eslint-disable no-underscore-dangle */
const Card = require('../models/card');
const NotFoundError = require('../errors/not_found_error');

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
}

function delCardID(req, res, next) {
  Card.findById(req.params._id)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!(card.owner.toString() === req.user._id.toString())) {
        return res.status(403).send({ message: 'это карта не Выша, её нельзя удалить' });
      }
      Card.findByIdAndRemove(req.params._id)
        .then((cardDel) => {
          if (!cardDel) {
            throw new NotFoundError('неправильно указан ID');
          }
          return res.send({ data: cardDel });
        });
    })
    .catch((err) => {
      if (err.message.indexOf('Cast to ObjectId failed for value') === 0 || err.message.indexOf('Cannot read property') === 0) {
        throw new NotFoundError('не правильно указан ID');
      }
      next(err);
    })
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(next);
}

function likeCard(req, res, next) {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('нет карты с таким ID');
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.message.indexOf('Cast to ObjectId failed for value') === 0 || err.message.indexOf('Cannot read property') === 0) {
        throw new NotFoundError('не правильно указан ID');
      } else next(err);
    })
    .catch(next);
}

function dislikeCard(req, res, next) {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('нет карты с таким ID');
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.message.indexOf('Cast to ObjectId failed for value') === 0 || err.message.indexOf('Cannot read property') === 0) {
        throw new NotFoundError('не правильно указан ID');
      } else next(err);
    })
    .catch(next);
}

module.exports = {
  getCards, delCardID, createCard, likeCard, dislikeCard,
};
