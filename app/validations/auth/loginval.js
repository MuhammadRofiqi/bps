const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string().required().email().trim(),
  password: Joi.string().required().trim()
});