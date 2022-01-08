const Joi = require('joi');

const fundWallet = {
  body: Joi.object().keys({
    amount: Joi.string().required()
  })
};

const veifyDeposit = {
  params: Joi.object().keys({
    referenceId: Joi.string().required()
  })
};
export {
  fundWallet,
  veifyDeposit
};
