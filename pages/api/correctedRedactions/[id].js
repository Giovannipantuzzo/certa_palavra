import { getById, deleteByID } from '../../../src/controllers/CorrectedRedactionController';
import { withAuthValidation } from '../../../src/utils/auth';

export default function handler(req, res) {
  try {
    const { method } = req;
    console.log(method);
    if (method === 'GET') {
      return withAuthValidation(getById)(req, res);
    }
    if (method === 'DELETE') {
      return withAuthValidation(deleteByID)(req, res);
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
}
