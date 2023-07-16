const router = require('express').Router();
const {
  validateMovie,
  validateMovieById  
} = require('../validate/movieValidate');
const {
  getMovies,
  createMovie,
  deleteMovie  
} = require('../controllers/movie');

router.get('/', getMovies);
router.post('/', validateMovie, createMovie);
router.delete('/:movieId', validateMovieById, deleteMovie);

module.exports = router;
