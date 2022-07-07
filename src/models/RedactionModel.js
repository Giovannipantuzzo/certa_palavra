/* eslint-disable no-await-in-loop */
/* eslint-disable no-async-promise-executor */
import RedactionCommentsModel from './RedactionCommentsModel';

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

  async getAllRedactions(status, firebase_id) {
    try {
      let response;
      firebase_id = 'LyYHRN8R9oRUdjwIbW6lthgybKp1';
      if (firebase_id) {
        response = await connection('redaction')
          .where('status', status)
          .where('firebase_id', firebase_id)
          .select('*');

        if (status === true || status === 'true') {
          for (const redaction of response) {
            const correctedRedaction = await connection('corrected_redactions')
              .where('redaction_id', redaction.redaction_id)
              .first();
            redaction.rate = correctedRedaction.rate;
            redaction.corrector_firebase_id = correctedRedaction.firebase_id;
          }
          for (const resp of response) {
            const corrector = await connection('user')
              .where('firebase_id', resp.corrector_firebase_id)
              .select('name', 'perfil_photo_url')
              .first();
            resp.corrector = corrector;
          }
          for (const redaction of response) {
            const redactionComments = await RedactionCommentsModel.getAllComments(redaction.redaction_id);
            redaction.comments = redactionComments;
          }
        } else {
          response = await connection('redaction')
            .where('status', status)
            .select('*');

          for (const redaction of response) {
            const correctedRedaction = await connection('corrected_redactions')
              .where('redaction_id', redaction.redaction_id)
              .first();
            redaction.rate = correctedRedaction?.rate;
          }
        }
      }

      return response;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async getAllRedactionsFiltered(status, firstDate, secondDate) {
    try {
      const response = await connection('redaction')
        .where('status', status)
        .where('redaction.created_at', '>=', `${firstDate}`)
        .where('redaction.corrected_at', '<=', `${secondDate}`)
        .select('*');
      return response;
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
