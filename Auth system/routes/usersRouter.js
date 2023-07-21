const express = require('express');
const passport = require('passport');


const UsersService = require('../services/usersService');
const {checkRoles} = require('../middlewares/authHandler')

const validatorHandler = require('../middlewares/validatorHandler');
const {createUserSchema,updatePartialUserSchema,getUserSchema,updateUserSchema,deleteUserSchema} = require('../schemas/userSchemas');


const router = express.Router();
const service = new UsersService();

const protectedRoute = passport.authenticate('jwt', { session: false });

//GET
router.get('/',
  protectedRoute,
  checkRoles('admin'),
  async (req, res, next) => {
  try {
    // console.log(req.user.role)
    const users = await service.find()
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  protectedRoute,
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
  try {
    const {id} = req.params;
    const user = await service.findOne(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
  });


//POST
  router.post('/',
  validatorHandler(createUserSchema, 'body'),
    async (req, res, next)=>{
      try {
        const body = req.body;
        const newUser = await service.create(body);
        res.status(201).json(newUser)
      } catch (error) {
        next(error);
      }
  });

//DELETE
  router.delete('/:id',
  validatorHandler(deleteUserSchema, 'params'),
    async (req, res, next) => {
      try {
        const {id} = req.params;
        const rta = await service.delete(id);
        res.json(rta);
      } catch (error) {
        next(error);
      }
  });
//PUT
router.put('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res,next)=>{
  try {
    const {id} = req.params;
    const body = req.body;
    const user = await service.update(id,body)
    res.json(user)
  } catch (error) {
    next(error);
  }
});
//PATCH
router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updatePartialUserSchema, 'body'),
  async (req, res,next)=>{
  try {
    const {id} = req.params;
    const body = req.body;
    const user = await service.update(id,body)
    res.json(user)
  } catch (error) {
    next(error);
  }
})

//
module.exports = router;

