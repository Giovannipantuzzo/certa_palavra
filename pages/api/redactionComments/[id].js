import { deleteComment } from '../../../src/controllers/RedactionCommentsController';
import { isAdminOrSelf } from '../../../src/utils/auth';

export default function handler(req, res) {
  try {
    const { method } = req;
    if (method === 'DELETE') {
      return isAdminOrSelf(deleteComment)(req, res);
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
}
