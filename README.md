# API_Mesto
## V 0.1
### Было реалезовано

- адрес localhost:3000 загружает фронтенд проекта Mesto
- в ответ на запрос GET localhost:3000/users сервер вернёт JSON-объект из файла users.json
- в ответ на запрос GET localhost:3000/cards сервер вернёт JSON-объект из файла cards.json
- в ответ на запрос GET localhost:3000/users/8340d0ec33270a25f2413b69, сервер вернёт JSON-объект пользователя с переданным после /users идентификатором,
  если пользователя с запрошенным идентификатором нет, API вернет 404 статус ответа и JSON: { "message": "Нет пользователя с таким id" };


### Для запуска сервера необходимо использовать команду: npm run start (запускает сервер на localhost:3000)
  - команда npm run dev запускает сервер на localhost:3000 с хот релоудом;

