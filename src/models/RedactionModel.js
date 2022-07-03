/* eslint-disable no-async-promise-executor */
const { connection } = require('../database/connection');

module.exports = {

  async getRedactionsById(id) {
    try {
      const redaction = await connection('redaction')
        .where('redaction_id', id)
        .select('*')
        .first();
      return redaction;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async getAllRedactions(status) {
    try {
      const redactions = await connection('redaction')
        .select('*')
        .where('status', status);
      return redactions;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async createNewRedaction(redaction) {
    try {
      const redaction_aux = await connection('redaction')
        .insert(redaction);
      return redaction_aux;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async deleteRedaction(id) {
    try {
      const response = await connection('redaction')
        .where({ redaction_id: id })
        .delete();
      return response;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async updateRedaction(redaction, id) {
    try {
      const response = await connection('redaction')
        .where({ redaction_id: id })
        .update(redaction);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
};
