const mongoose = require('mongoose');
const { REGEXP_URL } = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    country:{
      type: String,
      required: true,  
    },
    director: {
      type: String,
      required: true,  
    },
    duration: {
      type: Number,
      required: true,  
    },
    year: {
      type: String,
      required: true,  
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator (url) {
          return REGEXP_URL.test(url);  
        },
        message ({ value }) {
          return `${value} - некорректный адрес URL`;
        },  
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator (url) {
          return REGEXP_URL.test(url);  
        },
        message ({ value }) {
          return `${value} - некорректный адрес URL`;
        },  
      },  
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator (url) {
          return REGEXP_URL.test(url);  
        },
        message ({ value }) {
          return `${value} - некорректный адрес URL`;
        },  
      },  
    },
    nameRU: {
      type: String,
      required: true,  
    },
    nameEN: {
      type: String,
      required: true,  
    },
    movieId: {
      type: Number,
      required: true,
      unique: false,  
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',  
    },
  },
{ toJSON: { useProjection: true },
  toObject: { useProjection: true}
}
);

module.exports = mongoose.model('movie', movieSchema);