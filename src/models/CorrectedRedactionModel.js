/* eslint-disable no-async-promise-executor */
const { connection } = require('../database/connection');
const { v4: uuidv4 } = require('uuid');

module.exports = {

  async getAllRedactionsByCorrectorId(id) {
    try {
      const redaction = await connection('corrected_redactions')
        .where('firebase_id', id)
        .select('*');
      return redaction;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async getAllCorrectedRedactions() {
    try {
      const redactions = await connection('corrected_redactions')
        .select('*');
      return redactions;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async createNewCorrectedRedaction(redaction) {
    redaction.corrected_redaction_id = uuidv4();
    try {
      const redaction_aux = await connection('corrected_redactions')
        .insert(redaction);
      return redaction_aux;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async deleteCorrectedRedaction(id) {
    try {
      const response = await connection('corrected_redactions')
        .where({ redaction_id: id })
        .delete();
      return response;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async updateRate(redaction_id, rate) {
    try {
      const response = await connection('corrected_redactions')
        .where({ redaction_id })
        .update({ rate });
      return response;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async updateCorrection(redaction) {
    try {
      const response = await connection('corrected_redactions')
        .where({ redaction_id: redaction.redaction_id })
        .update(redaction);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
};
