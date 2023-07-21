const Joi = require('joi');

const id = Joi.number().integer();
const password = Joi.string();



const updateAccessSchema = Joi.object({
  password:password,
})

const getAccessSchema = Joi.object({
  id: id.required()
});


module.exports = {updateAccessSchema,getAccessSchema}
