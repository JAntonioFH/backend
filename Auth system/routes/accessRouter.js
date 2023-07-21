const express = require('express');
const passport = require('passport');

const AccessService = require('../services/accessService')

const validatorHandler = require('../middlewares/validatorHandler');
const {updateAccessSchema,getAccessSchema} = require('../schemas/accessSchema');


const router = express.Router();
const service = new AccessService();

//GET
router.get('/', async (req, res, next) => {
  try {
    const users = await service.find()
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
passport.authenticate('jwt', { session: false }),
  validatorHandler(getAccessSchema, 'params'),
  async (req, res, next) => {
  try {
    const {id} = req.params;
    const access = await service.findOne(id);
    res.json(access);
  } catch (error) {
    next(error);
  }
  });

  router.patch('/:id',
  validatorHandler(getAccessSchema, 'params'),
  validatorHandler(updateAccessSchema, 'body'),
  async (req, res,next)=>{
  try {
    const {id} = req.params;
    const body = req.body;
    const access = await service.update(id,body)
    res.json(access)
  } catch (error) {
    next(error);
  }
})



module.exports = router;
