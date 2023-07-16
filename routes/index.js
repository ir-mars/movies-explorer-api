const router = require('express').Router();
const routerUsers = require('./users');
const routerMovies = require('./movies');
const { login, createUser, logout } = require('../controllers/users');
const { validateLogin, validateRegister } = require('../utils/validate/userValidate');
const auth = require('../middlewares/auth');

const { NotFoundError } = require('../errors/NotFoundError');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, createUser);
router.use(auth);
router.post('/signout', logout);
router.use('/users', routerUsers);
router.use('/movies', routerMovies);
router.use('*', (req, res, next) => {
  next(new NotFoundError('По указанному вами адресу ничего не найдено'), res)
});

module.exports = router;