const Joi = require('joi');
const { password } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    fullName: Joi.string().required(),
    gender: Joi.string().valid('male', 'female').required(),
    title: Joi.string().required()
  })
};

const verifyEmail = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    token: Joi.string().required()
  })
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
};

export {
  createUser,
  verifyEmail,
  login
};
