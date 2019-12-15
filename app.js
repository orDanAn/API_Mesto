require('dotenv').config();
/* eslint-disable no-console */
const express = require('express');

const path = require('path');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const helmet = require('helmet');

const rateLimit = require('express-rate-limit');

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
app.post('/signin', apiLimiter, login);
app.post('/signup', apiLimiter, createUser);
app.use(auth);
app.use('/cards', routerCard);
app.use('/', routerUsers);
app.use('*', (req, res) => {
  res.status(404);
  res.send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`Слушаю порт  ${PORT}`);
});
