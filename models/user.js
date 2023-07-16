const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { UnauthorizedError } = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        message({ value }) {
          return `Ошибка! ${value} не является адресом электронной почты`;
        },
        validator(email) {
          return validator.isEmail(email);
        },
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    toJSON: { useProjection: true },
    toObject: { useProjection: true },
  },
);

userSchema.statics.findUserByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw new UnauthorizedError('Неправильная почта или пароль');
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    throw new UnauthorizedError('Неправильная почта или пароль');
  }
  return user;
};

module.exports = mongoose.model('user', userSchema);
