import { signIn } from '../../src/controllers/SessionController';
import { withSession } from '../../src/utils/auth';

export default function handler(req, res) {
  try {
    const { method } = req;
    if (method === 'POST') {
      return withSession(signIn)(req, res);
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
}
