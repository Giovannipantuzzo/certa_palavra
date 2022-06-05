import { withIronSession } from 'next-iron-session';

const sessionObject = {
  cookieName: 'userSession',
  password: 'complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

function withAuth(handler) {
  return async (req, res) => {
    try {
      const session = await req.session.get('user');

      if (!session) {
        await req.session.get('store');
      }
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

    if (type === 'admin') {
      return handler(req, res);
    }
    return res.status(403).json({ message: 'Unauthorized' });
  });
}

// Quando precisa validar que o usuário é um lojista logado antes de operar a requisição
export function isSeller(handler) {
  return withAuthValidation((req, res) => {
    const store = req.session.get('store');

    if (store) {
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

    if (type === 'admin' || id === requester_id) {
      return handler(req, res);
    }
    return res.status(403).json({ message: 'Unauthorized' });
  });
}

export function isAdminOrSeller(handler) {
  return withAuthValidation((req, res) => {
    const store = req.session.get('store');

    if (store) {
      return handler(req, res);
    }

    const { user: { type } } = req.session.get('user');
    if (type === 'admin') {
      return handler(req, res);
    }
    return res.status(403).json({ message: 'Unauthorized' });
  });
}
