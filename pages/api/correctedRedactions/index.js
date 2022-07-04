import {
  create, getAll, updateRate,
} from '../../../src/controllers/CorrectedRedactionController';
import { withAuthValidation } from '../../../src/utils/auth';

export default function handler(req, res) {
  try {
    const { method } = req;
    console.log(method);
    if (method === 'GET') {
      return withAuthValidation(getAll)(req, res);
    }
    if (method === 'POST') {
      return withAuthValidation(create)(req, res);
    }
    if (method === 'PUT') {
      return withAuthValidation(updateRate)(req, res);
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  } catch (error) {
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
}
