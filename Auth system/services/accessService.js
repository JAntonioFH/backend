const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class AccessService{

  async find(){
    const rta=await models.Access.findAll({
      include: ['user']
    });
    return rta;
  }

  // async findByUsername(userName){
  //   const rta=await models.User.findOne({
  //     where:{userName},
  //   });
  //   return rta;
  // }

  async findOne(id){
    const info = await models.Access.findByPk(id);
    if (!info) {
      throw boom.notFound('Información no encontrada')
    }
    return info;
  }
  async update(id, changes){
    const info = await this.findOne(id);
    const rta = await info.update(changes);
    return rta;
  }

  async findByUser(userid){
    const info = await models.Access.findOne({ where: { user_id: userid }});
    if (!info) {
      throw boom.notFound('Información no encontrada')
    }
    return info;
  }
  async updateByUser(id, changes){

    const info = await this.findByUser(id);
    const rta = await info.update(changes);
    return rta;
  }


}

module.exports = AccessService;


