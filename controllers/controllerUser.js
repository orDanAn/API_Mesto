const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not_found_error');
const Unauthorized = require('../errors/unauthorized_error');

const { NODE_ENV, JWT_SECRET } = process.env;

function getUsers(req, res, next) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
}

function getUserID(req, res, next) {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.send({ _id: user._id, name: user.name });
    })
    .catch((err) => {
      if (err.message.indexOf('Cast to ObjectId failed for value') === 0) {
        throw new NotFoundError('неправильно указан ID');
      }
      next(err);
    })
    .catch(next);
}

// eslint-disable-next-line consistent-return
function createUser(req, res, next) {
  if (!req.body.password) {
    throw new Unauthorized('Укажите пароль');
  }
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch(next);
}

function updateUser(req, res, next) {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch(next);
}

function updateAvatar(req, res, next) {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch(next);
}

function login(req, res, next) {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

      res
        .cookie('jwt', token, {
          httpOnly: true,
          sameSite: true,
        })
        .end();
    })
    .catch((err) => {
      // ошибка аутентификации
      throw new Unauthorized(err.message);
    })
    .catch(next);
}

module.exports = {
  getUsers, getUserID, createUser, updateUser, updateAvatar, login,
};
