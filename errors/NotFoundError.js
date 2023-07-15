const { ERROR_NOT_FOUND } = require('../utils/constants'); //404

class NotFoundError extends Error {
  constructor(message = 'Ничего не найдено') {
    super(message);
    this.statusCode = ERROR_NOT_FOUND;
  }
}
module.exports = {
  NotFoundError
};