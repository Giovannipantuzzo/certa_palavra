/* eslint-disable no-async-promise-executor */
const { connection } = require('../database/connection');

module.exports = {

  async getAllComments(redaction_id) {
    try {
      const response = await connection('redaction_comments')
        .where({ redaction_id: redaction_id })
        .orderBy('created_at')
        .select('*');
      return response;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async createComment(comment) {
    try {
      const response = await connection('redaction_comments')
        .insert(comment);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async deleteComment(id) {
    try {
      const response = await connection('redaction_comments')
        .where({ comment_id: id })
        .delete();
      return response;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
};
