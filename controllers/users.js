const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const ConflictingRequestError = require('../errors/conflicting-request-err');
const handleMongooseErrors = require('../utils/handleMongooseErrors');
const { findUserById, updateUser } = require('../utils/userFunctions');

const { STATUS_CREATED } = require('../utils/constants');

module.exports.getUsers = async (req, res, next) => {
  try {
    const user = await User.find({});
    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.userId);
    res.send({ data: user });
  } catch (err) {
    next(handleMongooseErrors(err));
  }
};

module.exports.createUser = async (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hashedPassword,
    });
    const userObject = user.toObject();
    delete userObject.password;
    res.status(STATUS_CREATED).send({ data: userObject });
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictingRequestError('Пользователь с такой почтой уже есть'));
    } else {
      next(handleMongooseErrors(err));
    }
  }
};

module.exports.updateProfile = async (req, res, next) => {
  const { name, about } = req.body;
  try {
    const user = await updateUser(req.user._id, { name, about });
    res.send({ data: user });
  } catch (err) {
    next(handleMongooseErrors(err));
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const user = await updateUser(req.user._id, { avatar });
    res.send({ data: user });
  } catch (err) {
    next(handleMongooseErrors(err));
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserInfo = async (req, res, next) => {
  try {
    const user = await findUserById(req.user._id);
    res.send({ data: user });
  } catch (err) {
    next(handleMongooseErrors(err));
  }
};
