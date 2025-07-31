
## Технологии

- Node.js
- Express.js
- TypeScript (или JavaScript)
- MySQL (через mysql2/promise)
- Архитектура MVC (Controllers → Services → Models)
- dotenv для конфигурации

---

## Установка
npm install
npm start

Установите зависимости:
bash
Редактировать
npm install
Создайте файл .env в корне проекта на основе .env.example и заполните необходимые переменные (пример ниже).



Запустите сервер:

npm start


Конфигурация .env
LOCAL_PORT=3005
LOCAL_HOST=http://localhost:
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=your_database_name

AMO_CLIENT_ID=ваш_client_id_из_amoCRM
AMO_CLIENT_SECRET=ваш_client_secret_из_amoCRM
AMO_REDIRECT_URI=http://localhost:3003/oauth
AMO_BASE_DOMAIN=yourcompany.amocrm.ru

AMO_ACCESS_TOKEN=текущий_токен_доступа


Структура базы данных в .sql
