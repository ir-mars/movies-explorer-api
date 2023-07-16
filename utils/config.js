require('dotenv').config();

const PORT = process.env.PORT || 3000;
const BASE_PATH = process.env.BASE_PATH || 'https://localhost.ru';
const DATABASE = process.env.DATABASE || 'mongodb://127.0.0.1:27017/bitfilmsdb';
const JWT_CODE = process.env.NODE_ENV === 'production'
  ? process.env.JWT_CODE
  : 'super-secret-code';
console.log(JWT_CODE);

module.exports = {
  PORT,
  BASE_PATH,
  DATABASE,
  JWT_CODE,
};
