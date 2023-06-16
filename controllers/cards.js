const Card = require('../models/card');

const {
  STATUS_CREATED,
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
} = require('../utils/constants');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card
      .find({})
      .populate('owner');
    res
      .send({ data: cards });
  } catch (err) {
    res
      .status(ERROR_INTERNAL_SERVER)
      .send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const card = await Card
      .create({ name, link, owner: req.user._id });
    res
      .status(STATUS_CREATED)
      .send({ data: card });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res
        .status(ERROR_BAD_REQUEST)
        .send({ message: 'Переданы некорректные данные в методе создания карточки' });
    } else {
      res
        .status(ERROR_INTERNAL_SERVER)
        .send({ message: 'На сервере произошла ошибка' });
    }
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const card = await Card
      .findByIdAndDelete(req.params.cardId);
    if (!card) {
      res
        .status(ERROR_NOT_FOUND)
        .send({ message: 'Карточка не найдена' });
      return;
    }
    res
      .send({ data: card });
  } catch (err) {
    if (err.name === 'CastError') {
      res
        .status(ERROR_BAD_REQUEST)
        .send({ message: 'Передан некорректные данные в методе удаления карточки' });
      return;
    }
    res
      .status(ERROR_INTERNAL_SERVER)
      .send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports.likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      res
        .status(ERROR_NOT_FOUND)
        .send({ message: 'Карточка не найдена' });
      return;
    }
    res
      .send({ data: card });
  } catch (err) {
    if (err.name === 'CastError') {
      res
        .status(ERROR_BAD_REQUEST)
        .send({ message: 'Передан некорректный _id карточки' });
      return;
    }
    res
      .status(ERROR_INTERNAL_SERVER)
      .send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports.dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      res
        .status(ERROR_NOT_FOUND)
        .send({ message: 'Карточка не найдена' });
      return;
    }
    res
      .send({ data: card });
  } catch (err) {
    if (err.name === 'CastError') {
      res
        .status(ERROR_BAD_REQUEST)
        .send({ message: 'Передан некорректный _id карточки' });
      return;
    }
    res
      .status(ERROR_INTERNAL_SERVER)
      .send({ message: 'На сервере произошла ошибка' });
  }
};
