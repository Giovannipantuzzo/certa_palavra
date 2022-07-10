/* eslint-disable no-await-in-loop */
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

  async getAllCorretores(firstDate, secondDate) {
    try {
      const users = await connection('user')
        .where('type', 'Corretor')
        .select('*');

      for (const corrector of users) {
        const correctedRedactions = (firstDate && secondDate) ? await connection('corrected_redactions')
          .where('firebase_id', corrector.firebase_id)
          .where('corrected_redactions.created_at', '>=', `${firstDate}`)
          .where('corrected_redactions.created_at', '<', `${secondDate}`)
          .select('*') : await connection('corrected_redactions')
            .where('firebase_id', corrector.firebase_id)
            .select('*');
        corrector.correctedRedactions = correctedRedactions.length;
      }

      return users;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async getAllUsers(firstDate, secondDate) {
    try {
      const users = await connection('user')
        .where('type', 'User')
        .select('name');

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
