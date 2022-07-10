import { withIronSession } from 'next-iron-session';

const sessionObject = {
  cookieName: 'userSession',
  password: 'complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'development',
  },
};

function withAuth(handler) {
  return async (req, res) => {
    try {
      await req.session.get('user');
      return handler(req, res);
    } catch (error) {
      console.error(error); // eslint-disable-line
      await req.session.destroy();
      res.setHeader('cache-control', 'no-store, max-age=0');
      return res.status(400).json({ message: 'No valid session provided', errorMessage: error.message });
    }
  };
}

// Quando precisa dos parâmetros da sessão
export function withSession(handlerFunction) {
  return withIronSession(handlerFunction, sessionObject);
}

// Quando precisa de validação da sessão antes de operar a requisição
export function withAuthValidation(handler) {
  return withSession(withAuth(handler));
}

// Quando precisa validar que o usuário é um administrador logado antes de operar a requisição
export function isAdmin(handler) {
  return withAuthValidation((req, res) => {
    const { user: { type } } = req.session.get('user');
    if (type === 'Admin') {
      return handler(req, res);
    }
    return res.status(403).json({ message: 'Unauthorized' });
  });
}

// Quando as rotas só devem estar acessíveis para administradores ou para o próprio usuário (exemplo: deletar um usuário)
export function isAdminOrSelf(handler) {
  return withAuthValidation((req, res) => {
    const { user: { type, firebase_id: requester_id } } = req.session.get('user');
    const { id } = req.query;

    if (type === 'Admin' || id === requester_id) {
      return handler(req, res);
    }
    return res.status(403).json({ message: 'Unauthorized' });
  });
}
