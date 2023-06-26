const mongoose = require('mongoose');
const ValidationError = require('../errors/validation-err');

const handleMongooseErrors = (err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    next(new ValidationError('Переданы некорректные данные'));
  } else if (err instanceof mongoose.Error.CastError) {
    next(new ValidationError('Передан некорректный id'));
  } else {
    next(err);
  }
};

module.exports = handleMongooseErrors;
