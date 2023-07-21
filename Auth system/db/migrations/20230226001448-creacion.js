'use strict';
const { USER_TABLE, UserSchema } = require('../models/userModel');
const { ACCESS_TABLE, AccessSchema } = require('../models/accessModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema)
    await queryInterface.createTable(ACCESS_TABLE, AccessSchema)
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE)
    await queryInterface.dropTable(ACCESS_TABLE)
  }
};
