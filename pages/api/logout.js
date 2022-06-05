import { logout } from '../../src/controllers/SessionController';
import { withSession } from '../../src/utils/Auth';

export default function handler(req, res) {
  const { method } = req;
  if (method === 'GET') {
    return withSession(logout)(req, res);
  }
  return res.status(500).json({ message: 'Internal Server Error' });
}
