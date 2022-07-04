import { getOne, update } from '../../../src/controllers/RedactionController';
import { isAdminOrSelf } from '../../../src/utils/auth';

export default function handler(req, res) {
  try {
    const { method } = req;
    if (method === 'GET') {
      return getOne(req, res);
    }
    if (method === 'PUT') {
      return update(req, res);
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
}
