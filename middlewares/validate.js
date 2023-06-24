const { celebrate, Joi } = require('celebrate');

const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const urlRegex = /^(https?:\/\/)?([A-Za-z0-9.-]+)(:[0-9]+)?(\/[^/]+)*\/?#?$/;

const validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().regex(emailRegex),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegex),
  }),
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().regex(emailRegex),
    password: Joi.string().required().min(8),
  }),
});

const validateGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(urlRegex),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(urlRegex),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validateSignUp,
  validateSignIn,
  validateGetUserById,
  validateUpdateProfile,
  validateUpdateAvatar,
  validateCreateCard,
  validateCardId,
};
