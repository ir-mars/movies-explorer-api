const { FORBIDDEN_ERROR } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message ='Ошибка доступа') {
    super(message);
    this.statusCode = FORBIDDEN_ERROR;
  }
}
module.exports = {
  ForbiddenError
};
