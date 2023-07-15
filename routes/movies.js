const router = require('express').Router();
const {
  validateMovie,
  validateMovieById  
} = require('../validate/movieValidate');
const {
  getMovies,
  createMovieCard,
  deleteMovieCard  
} = require()

router.get('/', getMovies);
router.post('/', validateMovie, createMovieCard);
router.delete('/:movieId', validateMovieById, deleteMovieCard);

module.exports = router;