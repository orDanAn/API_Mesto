require('dotenv').config();
/* eslint-disable no-console */
const express = require('express');

const path = require('path');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const helmet = require('helmet');

const rateLimit = require('express-rate-limit');

const { celebrate, Joi, errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const routerCard = require('./routes/cards.js');

const routerUsers = require('./routes/users.js');

const auth = require('./middlewares/auth.js');

const { login, createUser } = require('./controllers/controllerUser');

const { PORT = 3000 } = process.env;

const app = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', apiLimiter, celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(/^([\w0-9_-]\.)*[\w0-9_-]+@[\w0-9_-]+(\.[\w0-9_-]+)*\.\w{2,6}$/),
    password: Joi.string().required().min(6),
  }),
}), login);

app.post('/signup', apiLimiter, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().regex(/^(?:(?:https?|HTTPS?|ftp|FTP):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))\.?)(?::\d{2,})?(?:[/?#]\S*)?$/),
    email: Joi.string().required().regex(/^([\w0-9_-]\.)*[\w0-9_-]+@[\w0-9_-]+(\.[\w0-9_-]+)*\.\w{2,6}$/),
    password: Joi.string().required().min(6),
  }),
}), createUser);
app.use(auth);
app.use('/cards', routerCard);
app.use('/', routerUsers);
app.use('*', (req, res) => {
  res.status(404);
  res.send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`Слушаю порт  ${PORT}`);
});
