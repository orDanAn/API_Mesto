/* eslint-disable no-console */
const express = require('express');

const path = require('path');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const routerCard = require('./routes/cards.js');

const routerUser = require('./routes/userId.js');

const routerUsers = require('./routes/users.js');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = {
    _id: '5dd16b8a79c54121c8991021',
  };

  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use('/cards', routerCard);
app.use('/users', routerUser);
app.use('/users', routerUsers);
app.get('*', (req, res) => {
  res.status(404);
  res.send({ message: 'Запрашиваемый ресурс не найден' });
});


app.listen(PORT, () => {
  console.log(`Слушаю порт  ${PORT}`);
});
