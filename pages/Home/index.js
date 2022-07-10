import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import MenuHome from '../../src/components/MenuHome';
import {
  MeanHomeContainer, SideMenuDashboard, MeanDashboard,
  UsersCounter, UsersCounterLine,
} from '../../styles/homeStyles';
import InternalChangePassword from '../../src/components/InternalChangePassword';
import AdminDashboard from '../../src/components/AdminDashboard';
import MainDashboard from '../../src/components/MainDashboard';
import { useAuth } from '../../src/contexts/AuthContext';
import api from '../../src/utils/api';
import withAuthUser from '../../src/components/Authentication/WithAuthUser';

toast.configure();

function Intranet() {
  const [selectedButton, setSelectedButton] = useState('');
  const [usersCounter, setUsersCounter] = useState(0);
  const { logout, user } = useAuth();
  const router = useRouter();

  const usersNumber = async () => {
    try {
      const response = await api.get('/users');
      setUsersCounter(response.data?.length);
    } catch (error) {
      router.push('/404');
      toast('Erro ao obter dados', { position: toast.POSITION.BOTTOM_RIGHT });
    }
  };

  useEffect(() => {
    usersNumber();
    if (user?.type === 'Admin') setSelectedButton('DashboardAdmin');
    else if (user?.type === 'Corretor') setSelectedButton('DashboardAdmin');
    else setSelectedButton('DashboardAdmin');
  }, []);

  const menuDashboard = () => {
    switch (selectedButton) {
      case 'DashboardAdmin': return <MainDashboard />;
      case 'DashboardCorretor': return <AdminDashboard renderButton />;
      case 'Home': return <MainDashboard />;
      case 'Cadastro': router.push('/Cadastro');
      case 'Informações': return <InternalChangePassword />;
      case 'Alterar senha': return <InternalChangePassword />;
      case 'Sair': logout();

        break;
      default: return <div />;
    }
  };

  return (
    <>
      {user?.type === 'Admin' && (
        <UsersCounter>
          Número de usuários:
          {' '}
          {usersCounter}
          <UsersCounterLine />
        </UsersCounter>
      )}
      <MeanHomeContainer>
        <SideMenuDashboard>
          <MenuHome setSelectedButton={setSelectedButton} selectedButton={selectedButton} />
        </SideMenuDashboard>
        <MeanDashboard>
          {menuDashboard()}
        </MeanDashboard>
      </MeanHomeContainer>
    </>
  );
}

export default withAuthUser(Intranet);
