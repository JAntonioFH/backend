const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const {config} =require('../config/config');
const jwt = require('jsonwebtoken');


const MailService = require('./mailServices');
const UserService = require('./usersService');
const AccessService = require('./accessService');

const service= new UserService();
const mailService = new MailService();
const accesService = new AccessService();

class AuthService{

  async getUser(username, password){
    const user = await service.findByUsername(username);
    if(!user){
      throw(boom.unauthorized(),false);
    }
    const isMatch = await bcrypt.compare(password,user.dataValues.userAccess.dataValues.password);
    if (!isMatch) {
      throw(boom.unauthorized(),false);
    }
    delete user.dataValues.userAccess.dataValues.password
    return user
  }

  signToken(user){
    const payload = {
      sub:user.id,
      role:user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return({
      user,
      token
    });
  }

  async sendRecovery(username){
      const user = await service.findByUsername(username);
      if(!user){
        throw(boom.unauthorized(),false);
      }
      const payload = {sub:user.id}
      const token = jwt.sign(payload, config.jwtSecret,{expiresIn:'15min'});
      const link = `http://localhost:3000/api/v1/recovery?token=${token}`
      await accesService.updateByUser(user.id,{recoveryToken:token})
      const mail = {
        from: config.email, // sender address
        to: `${user.email}`, // list of receivers
        subject: "Email de recuperación de password", // Subject line
        html: `<b>Ingresa a este link para generar la contraseña => ${link}</b>`, // html body
      }
      const rta = await mailService.sendMail(mail);
      return rta;
    }

  async changePassword(token, newPassword){
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await accesService.findByUser(payload.sub)
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      await accesService.update(user.id,{recoveryToken:null,password:newPassword})
      return{message:'password changed'}
    } catch (error) {
      throw boom.unauthorized();
    }
  }
}

module.exports = AuthService
