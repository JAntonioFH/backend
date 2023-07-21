const Joi = require('joi');

const username = Joi.string();




const recoverySchema = Joi.object({
  username:username.required(),
});

// const changePasswordSchema = Joi.object({
//   username:username.required(),
// });

module.exports = {recoverySchema}
