const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');

const findUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError('Пользователь не найден');
  }
  return user;
};

const updateUser = async (userId, updates) => {
  const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });
  if (!user) {
    throw new NotFoundError('Пользователь не найден');
  }
  return user;
};

module.exports = {
  findUserById,
  updateUser,
};
