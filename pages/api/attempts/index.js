import nextConnect from 'next-connect';
import {
  create, getAll,
} from '../../../src/controllers/AttemptsController';
import middleware from '../../../src/middleware/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    const { method } = req;
    console.log(method);
    if (method === 'GET') {
      return getAll(req, res);
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
});

handler.post(async (req, res) => {
  try {
    const { method } = req;
    console.log(method);
    if (method === 'POST') {
      return create(req, res);
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
});

export default handler;