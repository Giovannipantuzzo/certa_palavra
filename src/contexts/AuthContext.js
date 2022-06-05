import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import api from '../utils/api';

moment.locale('pt-br');

toast.configure();

const emptyContextInfo = {
  user: undefined,
  login: async () => null,
  logout: async () => null,
  forgottenPassword: async () => null,
  validateSession: async () => null,
  isLoading: true,
};

const AuthContext = React.createContext(emptyContextInfo);

function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line consistent-return
  async function login(email, password, setShowModal, setContent) {
    try {
      const response = await api.post('login', { email, password });
      if (response.data === 'Loja sem cadastro' || response.data === 'Loja em espera') {
        return response.data;
      }

      if (response.data.user !== undefined) {
        setUser(response.data.user);
        router.push('/Home');
        toast('Login efetuado com sucesso', { position: toast.POSITION.BOTTOM_RIGHT });
      }
    } catch (error) {
      const resp = await api.get(`attempts/${email}`);
      if (resp.data.attempts === 3 && moment() < moment(resp.data.lock_time)) {
        setShowModal(true);
        const time = moment(resp.data.lock_time).fromNow();
        setContent(time);
        toast('Usuário bloqueado', { position: toast.POSITION.BOTTOM_RIGHT });
      }
      // eslint-disable-next-line no-console
      console.error(error);
      toast('E-mail ou senha incorretos!', { position: toast.POSITION.BOTTOM_RIGHT });
    }
  }

  async function forgottenPassword(email) {
    try {
      await api.post('forgottenPassword', { email });
      router.push('/');
    } catch (error) {
      console.error(error); //eslint-disable-line
    }
  }

  async function logout() {
    try {
      await api.get('logout');
      setUser(undefined);
      router.push('/login');
    } catch (error) {
      console.error(error); //eslint-disable-line
    }
  }

  async function validateSession() {
    try {
      const response = await api.get('session');
      if (response.data.user !== undefined) {
        setUser(response.data.user);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error); //eslint-disable-line
    }
  }

  useEffect(() => {
    validateSession();
    if (!user) {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      // eslint-disable-next-line max-len
      user, login, setUser, logout, forgottenPassword, isLoading,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export default AuthContext;
export { AuthProvider, useAuth };
