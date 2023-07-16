const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, BASE_PATH, DATABASE } = require('./utils/config');
const { errorHandler } = require('./middlewares/errorHandler');
const { limiter } = require('./middlewares/limiter');

const app = express();

mongoose.connect(DATABASE, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors);
app.use(limiter);
app.use(requestLogger);

app.use(routes);
app.use(errorLogger);
app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  errorHandler(err, res);
});

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(`${BASE_PATH}:${PORT}`);
});
