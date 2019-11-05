const express = require('express');

const path = require('path');

const routerCard = require('./routes/cards.js');

const routerUser = require('./routes/user id.js');

const routerUsers = require('./routes/users.js');

const { PORT = 3000 } = process.env;

const app = express();


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
