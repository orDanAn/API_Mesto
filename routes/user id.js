const routerUser = require('express').Router();
const user = require('../data/users.json');

routerUser.get('/:_id', (req, res) => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < user.length; i++) {
    // eslint-disable-next-line no-underscore-dangle
    if ((user[i]._id === req.params._id)) {
      res.send(user[i]);
      return;
    }
  }
  res.status(404).send({ message: 'Нет пользователя с таким id' });
});

module.exports = routerUser;
