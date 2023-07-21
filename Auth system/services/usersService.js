const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class UsersService{

  async create(data){
    const newUser = await models.User.create(data,{
      include:['userAccess']
    })
    return newUser
  }
  async find(){
    const rta=await models.User.findAll({ });
    return rta;
  }


  async findByUsername(userName){
    const rta=await models.User.findOne({
      where:{userName},
      include:['userAccess']
    });
    // if (rta===null) {
    //   throw boom.unauthorized('Usuario no encontrado')
    // }
    return rta;
  }


  async findOne(id){
    const user = await models.User.findByPk(id,{
      include:['userAccess']
    });
    if (!user) {
      throw boom.notFound('Usuario no encontrado')
    }
    return user;
  }
  async update(id, changes){
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }
  async delete(id){
    const user = await this.findOne(id);
    await user.destroy();
    return {id};
  }
}

module.exports = UsersService;

