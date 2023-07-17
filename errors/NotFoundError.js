const { NOT_FOUND_ERROR } = require('../utils/constants'); // 404

class NotFoundError extends Error {
  constructor(message = 'Ничего не найдено') {
    super(message);
    this.statusCode = NOT_FOUND_ERROR;
  }
}
module.exports = {
  NotFoundError,
};
