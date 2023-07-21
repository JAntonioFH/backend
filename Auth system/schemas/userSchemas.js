const Joi = require('joi');

const id = Joi.number().integer();
const userName = Joi.string().min(3);
const email = Joi.string().email();
const role = Joi.string().min(3);
const status = Joi.string().min(3);

//

//
const password = Joi.string();

const createUserSchema = Joi.object({
  userName: userName.required(),
  email:email.required(),
  userAccess:Joi.object({
    password:password.required(),
  })
});

const updatePartialUserSchema = Joi.object({
  userName: userName,
  email:email,
  role:role,
  status:status,
});

const getUserSchema = Joi.object({
  id: id.required()
});

const updateUserSchema = Joi.object({
  userName: userName.required(),
  email:email.required(),
  role:role.required(),
  status:status.required(),
});

const deleteUserSchema = Joi.object({
  id:id.required()
});

module.exports = {createUserSchema,updatePartialUserSchema,getUserSchema,updateUserSchema,deleteUserSchema}
