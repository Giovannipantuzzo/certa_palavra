import { create, getAllCorretores } from '../../../src/controllers/UserController';
import { isAdmin } from '../../../src/utils/Auth';

export default function handler(req, res) {
  try {
    const { method } = req;
    if (method === 'POST') {
      return create(req, res);
    }
    if (method === 'GET') {
      return isAdmin(getAllCorretores)(req, res);
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
}
