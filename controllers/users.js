const User = require('../models/user');

const {
  STATUS_CREATED,
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
} = require('../utils/constants');

module.exports.getUsers = async (req, res) => {
  try {
    const user = await User
      .find({});
    res
      .send({ data: user });
  } catch (err) {
    res
      .status(ERROR_INTERNAL_SERVER)
      .send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User
      .findById(req.params.userId);
    if (!user) {
      res
        .status(ERROR_NOT_FOUND)
        .send({ message: 'Пользователь по указанному _id не найден' });
      return;
    }
    res.send({ data: user });
  } catch (err) {
    if (err.name === 'CastError') {
      res
        .status(ERROR_BAD_REQUEST)
        .send({ message: 'Передан некорректный _id пользователя' });
      return;
    }
    res
      .status(ERROR_INTERNAL_SERVER)
      .send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User
      .create({ name, about, avatar });
    res
      .status(STATUS_CREATED)
      .send({ data: user });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res
        .status(ERROR_BAD_REQUEST)
        .send({ message: 'Переданы некорректные данные при создании пользователя' });
      return;
    }
    res
      .status(ERROR_INTERNAL_SERVER)
      .send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports.updateProfile = async (req, res) => {
  const { name, about } = req.body;
  try {
    const user = await User
      .findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true });
    if (!user) {
      res
        .status(ERROR_NOT_FOUND)
        .send({ message: 'Пользователь не найден' });
      return;
    }
    res.send({ data: user });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res
        .status(ERROR_BAD_REQUEST)
        .send({ message: 'Пользователь с указанным _id не найден' });
      return;
    }
    res
      .status(ERROR_INTERNAL_SERVER)
      .send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports.updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    const user = await User
      .findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true });
    if (!user) {
      res
        .status(ERROR_NOT_FOUND)
        .send({ message: 'Пользователь не найден' });
      return;
    }
    res.send({ data: user });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res
        .status(ERROR_BAD_REQUEST)
        .send({ message: 'Переданы некорректные данные при обновлении аватара' });
      return;
    }
    res
      .status(ERROR_INTERNAL_SERVER)
      .send({ message: 'На сервере произошла ошибка' });
  }
};
