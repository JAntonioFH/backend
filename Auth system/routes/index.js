const express = require('express')
const passport = require('passport');

const {checkRoles} = require('../middlewares/authHandler')

const usersRouter = require('./usersRouter');
const accessRouter = require('./accessRouter');
const authRouter = require('./authRouter');
const protectedRoute = passport.authenticate('jwt', { session: false });

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users',usersRouter);
    router.use('/access',protectedRoute,checkRoles('admin'),accessRouter);
  router.use('/auth',authRouter);
}

module.exports = routerApi;
//router.use('/categories', passport.authenticate('jwt', { session: false }), categoriesRouter);
