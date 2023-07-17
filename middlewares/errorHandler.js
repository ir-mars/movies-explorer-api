const mongoose = require('mongoose');
const { NotFoundError } = require('../errors/NotFoundError'); // 404
const { ForbiddenError } = require('../errors/ForbiddenError'); // 403
const { UnauthorizedError } = require('../errors/UnauthorizedError'); // 401
const { ConflictError } = require('../errors/ConflictError');
// 409
const { CastError, ValidationError } = mongoose.Error;

const {
  BAD_REQUEST_ERROR, // 400
  INTERNAL_SERVER_ERROR, // 500
} = require('../utils/constants');

function errorHandler(error, response) {
  console.log(error)
  if (error instanceof CastError || error instanceof ValidationError) {
    return response
      .status(BAD_REQUEST_ERROR)
      .send({ message: 'Переданы некорректные данные' });
  }
  if (
    error instanceof NotFoundError
    || error instanceof UnauthorizedError
    || error instanceof ForbiddenError
    || error instanceof ConflictError
  ) {
    const { message, statusCode } = error;
    return response.status(statusCode).send({ message });
  }
  return response
    .status(INTERNAL_SERVER_ERROR)
    .send({ message: 'Произошла ошибка сервера' });
}

function notFoundError() {
  throw new NotFoundError();
}
module.exports = {
  errorHandler,
  notFoundError,
};
