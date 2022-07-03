import {
  create, getAll,
} from '../../../src/controllers/CorrectedRedactionController';
import { withAuthValidation } from '../../../src/utils/auth';

export default function handler(req, res) {
  try {
    const { method } = req;
    console.log(method);
    if (method === 'GET') {
      return getAll(req, res);
    }
    if (method === 'POST') {
      return create(req, res);
    }
    if (method === 'DELETE') {
      return withAuthValidation(deleteAllProductsCart)(req, res);
    }
    if (method === 'PUT') {
      return withAuthValidation(updateProductAmount)(req, res);
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  } catch (error) {
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
}
