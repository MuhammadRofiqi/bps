const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string().required().trim(),
  email: Joi.string().required().email().trim(),
  password: Joi.string().required().trim()
});