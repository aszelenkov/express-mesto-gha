const Card = require('../models/card');
const handleMongooseErrors = require('../utils/handleMongooseErrors');

const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const { STATUS_CREATED, STATUS_OK } = require('../utils/constants');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate('owner');
    res.status(STATUS_OK).send({ data: cards });
  } catch (err) {
    next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(STATUS_CREATED).send({ data: card });
  } catch (err) {
    next(handleMongooseErrors(err));
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    if (card.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Недостаточно прав для удаления карточки');
    }
    await Card.deleteOne({ _id: req.params.cardId });
    res.status(STATUS_OK).send({ data: card });
  } catch (err) {
    next(handleMongooseErrors(err));
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    res.status(STATUS_OK).send({ data: card });
  } catch (err) {
    next(handleMongooseErrors(err));
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    res.status(STATUS_OK).send({ data: card });
  } catch (err) {
    next(handleMongooseErrors(err));
  }
};
