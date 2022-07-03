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

  async getAllCorretores() {
    try {
      const users = await connection('user')
        .where('type', 'Corretor')
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
