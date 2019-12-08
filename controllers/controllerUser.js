const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

function getUsers(req, res) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
}

function getUserID(req, res) {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'нет пользователя с таким ID' });
      }
      return res.send({ _id: user._id, name: user.name });
    })
    .catch((err) => {
      if (err.message.indexOf('Cast to ObjectId failed for value') === 0) {
        return res.status(404).send({ message: 'неправильно указан ID' });
      }
      return res.status(500).send({ message: err.message });
    });
}

// eslint-disable-next-line consistent-return
function createUser(req, res) {
  if (!req.body.password) {
    return res.send({ message: 'Укажите пароль' });
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
    .catch((err) => res.status(500).send({ message: err.message }));
}

function updateUser(req, res) {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
}

function updateAvatar(req, res) {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
}

function login(req, res) {
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
      res
        .status(401)
        .send({ message: err.message });
    });
}

module.exports = {
  getUsers, getUserID, createUser, updateUser, updateAvatar, login,
};
