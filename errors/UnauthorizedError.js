const { UNAUTHORIZED_ERROR } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message = 'Авторизация не получилась') {
    super(message);
    this.statusCode = UNAUTHORIZED_ERROR;
  }
}
module.exports = {
  UnauthorizedError,
};
