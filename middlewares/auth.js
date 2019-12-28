const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

const Unauthorized = require('../errors/unauthorized_error');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    const err = new Unauthorized('Необходима авторизация!!!');
    next(err);
  }
  req.user = payload;

  next();
};
