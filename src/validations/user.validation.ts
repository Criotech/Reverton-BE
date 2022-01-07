const Joi = require('joi');
const { password } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
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

const updateUserProfile = {
  body: Joi.object().keys({
    fullName: Joi.string(),
    gender: Joi.string().valid('male', 'female'),
    title: Joi.string(),
    dob: Joi.string(),
    phone: Joi.string()
  })
};

// const updateDp = {

// }

export {
  createUser,
  verifyEmail,
  login,
  updateUserProfile
};
