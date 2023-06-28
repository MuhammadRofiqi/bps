const Joi = require('joi');

module.exports = Joi.object({
  password: Joi.string().required().trim(),
  confirm_password: Joi.string().required().trim(),
});