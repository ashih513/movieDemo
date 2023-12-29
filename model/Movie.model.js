const mongoose = require('mongoose');
const MovieSchema = require("../schema/movie.schema");
const MovieModel = mongoose.model('movies', MovieSchema, 'movies');
module.exports = MovieModel;