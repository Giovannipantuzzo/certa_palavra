/* eslint-disable object-shorthand */
const { connection } = require('../database/connection');

module.exports = {
  async createAttempt(attempt) {
    try {
      await connection('Login_attempts')
        .insert(attempt);
      return attempt;
    } catch (error) {
      throw new Error(error);
    }
  },
  async deleteAttempt(email) {
    try {
      const response = await connection('Login_attempts')
        .where({ email: email })
        .delete();
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  async getAttemptByEmail(email) {
    try {
      const attempt = await connection('Login_attempts')
        .where({ email: email })
        .first();
      return attempt;
    } catch (error) {
      throw new Error(error);
    }
  },
  async getAllAttempt() {
    try {
      const attempt = await connection('Login_attempts')
        .select('*');
      return attempt;
    } catch (error) {
      throw new Error(error);
    }
  },
  async updateAttempt(attempt, email) {
    try {
      const response = await connection('Login_attempts')
        .where({ email: email })
        .update(attempt);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },

};
