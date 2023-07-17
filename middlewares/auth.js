const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/UnauthorizedError');
const { JWT_CODE } = require('../utils/config');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_CODE);
    req.user = payload;
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }
  next();
};
