const { CONFLICT_ERROR } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message = 'Ошибка (данные должны быть уникальными)') {
    super(message);
    this.statusCode = CONFLICT_ERROR;
  }
}
module.exports = {
  ConflictError
};
