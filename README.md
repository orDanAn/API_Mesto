# API_Mesto
## V 0.6
### Было реалезовано


- в ответ на запрос GET localhost:3000/users сервер возвращает всех пользователей из базы
- в ответ на запрос GET localhost:3000/cards сервер возвращает все карточки всех пользователей
- в ответ на запрос GET localhost:3000/users/:id, сервер возвращает конкретного пользователя (по id),
  если пользователя с запрошенным идентификатором нет, API вернет 404 статус ответа и ошибку
- запрос POST localhost:3000/users создаёт пользователя необходимо указать три параметра (name, about, avatar (должен быть ссылкой))
- запрос GET localhost:3000/cards возвращает все карточки всех пользователей 
- запрос DELETE localhost:3000/cards/:cardId — удаляет карточку по идентификатору. Если карточки с запрошенным идентификатором нет, API вернет 404 статс ответа и ошибку
- запрос POST localhost:3000/cards создаёт карточку необходимо указать два параметра (name, link(ссылка на фото места))
- запрос PATCH localhost:3000/users/me — обновит профиль
- запрос PATCH localhost:3000/users/me/avatar — обновит аватар
- запрос PUT localhost:3000/cards/:cardId/likes — поставит лайк карточке
- запрос DELETE localhost:3000/cards/:cardId/likes — уберет лайк карточке
- если почта и пароль верные, контроллер login возвращает созданный токен в ответе
- все роуты, кроме /signin и /signup, защищены авторизацией
- при правильном JWT авторизационный мидлвэр добавляет в объект запроса пейлоуд и пропускает запрос дальше



### Для запуска сервера необходимо использовать команду: npm run start (запускает сервер на localhost:3000)
  - команда npm run dev запускает сервер на localhost:3000 с хот релоудом;

