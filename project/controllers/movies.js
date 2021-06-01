const Movie = require('../models/movies')
const successResponse = require('../lib/handlers/success-response-sender');
const errorResponse = require('../lib/handlers/error-response-sender');
const moviesFilter = require('../lib/tmdb/movies-filter')

module.exports = {
  fetchAll: async (req, res) => {
    try {
      const movies = await Movie.find();
      successResponse(res, 'List of all movies', movies);
    } catch (error) {
      errorResponse(res, 500, error.message)
    }
  },
  fetchOne: async (req, res) => {
    try {
      let movie = await Movie.findById(req.params.id);
      if (!movie) errorResponse(res, 400, 'No movie with the provided id')

      movie = movie.toObject();
      movie = {
        ...movie,
        movie: await moviesFilter(movie.name),
      }

      successResponse(res, `Movie with id #${req.params.id}`, movie);
    } catch (error) {
      errorResponse(res, 500, error.message)
    }
  },
  create: async (req, res) => {
    try {
      const movie = await Movie.create(req.body);
      successResponse(res, 'New movie added', movie);
    } catch (error) {
      errorResponse(res, 500, error.message)
    }
  }
}