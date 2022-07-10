const AttemptsModel = require('../models/AttemptsModel');

module.exports = {
  async create(request, response) {
    const info = request.body;
    try {
      const newAttempt = await AttemptsModel.createAttempt(info);
      return response.status(200).json(newAttempt);
    } catch (error) {
      if (error.message) {
        return response.status(400).json({ notification: error.message });
      }
      return response.status(500).json({ notification: 'Internal Server Error' });
    }
  },
  async getOne(request, response) {
    const email = request.query.id;
    try {
      const attempt = await AttemptsModel.getAttemptByEmail(email);
      return response.status(200).json(attempt);
    } catch (error) {
      if (error.message) {
        return response.status(400).json({ notification: error.message });
      }
      return response.status(500).json({ notification: 'Internal Server Error' });
    }
  },

  async getAll(request, response) {
    try {
      const attempt = await AttemptsModel.getAllAttempt();
      return response.status(200).json(attempt);
    } catch (error) {
      if (error.message) {
        return response.status(400).json({ notification: error.message });
      }
      return response.status(500).json({ notification: 'Internal Server Error' });
    }
  },

  async remove(request, response) {
    const { email } = request.query;
    try {
      await AttemptsModel.deleteAttempt(email);
    } catch (error) {
      if (error.message) {
        return response.status(400).json({ notification: error.message });
      }
      return response.status(500).json({ notification: 'Internal Server Error' });
    }
    return response.status(200).json({ notification: 'Attempt deleted' });
  },
  async update(request, response) {
    const attempt = request.body;

    const email = request.query.id;
    try {
      await AttemptsModel.updateAttempt(attempt, email);
    } catch (error) {
      if (error.message) {
        return response.status(400).json({ notification: error.message });
      }
      return response.status(500).json({ notification: 'Internal Server Error' });
    }
    return response.status(200).json({ notification: 'Attempt updated' });
  },
};
