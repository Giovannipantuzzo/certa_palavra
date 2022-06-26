/* eslint-disable no-async-promise-executor */
const { connection } = require('../database/connection');

module.exports = {

  async getUserById(id) {
    try {
      const user = await connection('user')
        .where('firebase_id', id)
        .select('*')
        .first();
      return user;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async getAllUsers() {
    try {
      const users = await connection('user')
        .select('*');
      return users;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async createNewUser(user) {
    try {
      const user_aux = await connection('user')
        .insert(user);
      return user_aux;
    } catch (error) {
      console.log("🚀 ~ file: UserModel.js ~ line 36 ~ createNewUser ~ user", user)
      console.error(error);
      throw new Error(error);
    }
  },

  async deleteUser(id) {
    try {
      const response = await connection('user')
        .where({ firebase_id: id })
        .delete();
      return response;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async updateUser(user, id) {
    try {
      const response = await connection('user')
        .where({ firebase_id: id })
        .update(user);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
};
