const { Model, DataTypes, Sequelize } = require('sequelize');
const {USER_TABLE} = require('./userModel');
const bcrypt = require('bcrypt');


const   ACCESS_TABLE = 'access';

const AccessSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  recoveryToken: {
    allowNull: true,
    field: 'recovery_token',
    type: DataTypes.STRING,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    field: 'user_id',
    references:{
      model:USER_TABLE,
      key: 'id'
    },
    onUpdate:'CASCADE',
    onDelete:'CASCADE'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Access extends Model {
  static associate(models) {
    this.belongsTo(models.User, {as:'user'})
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ACCESS_TABLE,
      modelName: 'Access',
      timestamps: false,
      hooks: {
        beforeCreate: async (access) => {
          const password = await bcrypt.hash(access.password, 10);
          access.password = password;
        },
        beforeUpdate: async (access) => {
          if (access.changed('password')) {
            const password = await bcrypt.hash(access.password, 10);
            access.password = password;
          }
        }
      }
    }
  }
}


module.exports = { ACCESS_TABLE, AccessSchema, Access }
