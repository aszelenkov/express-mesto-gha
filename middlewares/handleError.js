const InternalServerError = require('../errors/internal-server-err');

const handleError = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? new InternalServerError('На сервере произошла ошибка').message
        : message,
    });
  next();
};

module.exports = handleError;
