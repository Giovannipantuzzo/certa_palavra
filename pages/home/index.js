import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import MenuHome from '../../src/components/MenuHome';
import {
  MeanHomeContainer,
  SideMenuDashboard,
  MeanDashboard,
} from '../../styles/homeStyles';
import InternalChangePassword from '../../src/components/InternalChangePassword';
import AdminDashboard from '../../src/components/AdminDashboard';
import MainDashboard from '../../src/components/MainDashboard';
import { useAuth } from '../../src/contexts/AuthContext';

toast.configure();

function Intranet() {
  const [selectedButton, setSelectedButton] = useState('');
  const { logout } = useAuth();

  useEffect(() => {
    // console.log("🚀 ~ file: index.js ~ line 21 ~ Intranet ~ selectedButton", selectedButton)
  }, [selectedButton])

  const menuDashboard = () => {
    switch (selectedButton) {
      case 'DashboardAdmin': return <MainDashboard />;
      case 'DashboardCorretor': return <AdminDashboard />;
      case 'Home': return <MainDashboard />;
      case 'Informações': return <InternalChangePassword />;
      case 'Alterar senha': return <InternalChangePassword />;
      case 'Sair': logout();

      default: return <div />;
    }
  };

  return (
    <MeanHomeContainer>
      <SideMenuDashboard>
        <MenuHome setSelectedButton={setSelectedButton} selectedButton={selectedButton} />
      </SideMenuDashboard>
      <MeanDashboard>
        {menuDashboard()}
      </MeanDashboard>
    </MeanHomeContainer>
  );
}

export default Intranet;
