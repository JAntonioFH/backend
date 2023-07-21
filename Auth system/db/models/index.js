const { User, UserSchema } = require('./userModel');
const { Access, AccessSchema } = require('./accessModel');


function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Access.init(AccessSchema, Access.config(sequelize));


  User.associate(sequelize.models);
  Access.associate(sequelize.models);


}

module.exports = setupModels;
