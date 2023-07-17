const Movie = require('../models/movie');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { notFoundError } = require('../middlewares/errorHandler');
const { NotFoundError } = require('../errors/NotFoundError');
const { SUCCES_ADDED_STATUS } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    /* .populate([{ path: 'owner', model: 'user' }]) */
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const ownerId = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner: ownerId,
  })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(SUCCES_ADDED_STATUS).send(card))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    // .populate([{ model: 'user', path: 'owner' }])
    .then((deletedCard) => {
      if (!deletedCard) {
        throw new NotFoundError('Карточка фильма не найдена');
      }
      if (deletedCard.owner._id.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Нельзя удалить карточку фильма, созданную не вами');
      }
      return deletedCard.deleteOne()
        .then((card) => {
          if (card) {
            res.send(card);
          } else {
            notFoundError();
          }
        })
        .catch(next);
    })
    .catch(next);
};
