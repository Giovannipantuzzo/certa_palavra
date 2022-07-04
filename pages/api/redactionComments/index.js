import { createComment, getAllComments } from '../../../src/controllers/RedactionController';
// import { isAdmin } from '../../../src/utils/Auth';

export default function handler(req, res) {
  try {
    const { method } = req;
    if (method === 'POST') {
      return createComment(req, res);
    }
    if (method === 'GET') {
      return getAllComments(req, res);
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
}
