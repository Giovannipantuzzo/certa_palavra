import { getOne, update, deleteBoth } from '../../../src/controllers/UserController';
import { isAdmin, isAdminOrSelf } from '../../../src/utils/auth';

export default function handler(req, res) {
  try {
    const { method } = req;
    if (method === 'GET') {
      return isAdminOrSelf(getOne)(req, res);
    }
    if (method === 'PUT') {
      return isAdminOrSelf(update)(req, res);
    }
    if (method === 'DELETE') {
      return deleteBoth(req, res);
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
}
