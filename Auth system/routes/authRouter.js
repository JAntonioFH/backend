const express = require('express');
const passport = require('passport');

const validatorHandler = require('../middlewares/validatorHandler');
const {recoverySchema} = require('../schemas/authSchema');

const AuthService = require('../services/authService');
const router = express.Router();

const service = new AuthService();


//POST
  router.post('/login',
  passport.authenticate('local',{session:false}),
    async (req, res, next)=>{
      try {
        const user = req.user;
        res.json(service.signToken(user));
      } catch (error) {
        next(error);
      }
  });

//

router.post('/recovery',
validatorHandler(recoverySchema, 'body'),
  async (req, res, next) => {
    try {
      const{username} =  req.body;
      const rta = await service.sendRecovery(username)
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);



router.post('/change-password',
  async (req, res, next) => {
    try {
      const{token, newPassword} =  req.body;
      const rta = await service.changePassword(token, newPassword)
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;


