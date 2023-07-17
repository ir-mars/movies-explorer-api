const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { notFoundError } = require('../middlewares/errorHandler');
const { ConflictError } = require('../errors/ConflictError');
const { SUCCES_ADDED_STATUS } = require('../utils/constants');
const { JWT_CODE } = require('../utils/config');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hashCode) => User.create({ name, email, password: hashCode })
      .then((user) => res.status(SUCCES_ADDED_STATUS).send(user))
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError('Пользователь с данным email уже существует'));
        } else {
          next(err);
        }
      }))
    .catch(next);
};

function getUserById(_id, res, next) {
  User.findById({ _id })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        notFoundError();
      }
    })
    .catch(next);
}

module.exports.getUser = (req, res, next) => {
  const { _id } = req.user;
  getUserById(_id, res, next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const dataToUpdate = { name, email };
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, dataToUpdate, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        notFoundError();
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_CODE, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.clearCookie('token').send({ message: 'Вы вышли' });
};
