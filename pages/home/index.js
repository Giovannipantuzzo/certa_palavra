import React, { useState } from 'react';
import { toast } from 'react-toastify';
import MenuHome from '../../src/components/MenuHome';
import {
  MeanHomeContainer,
  SideMenuDashboard,
  MeanDashboard,
} from '../../styles/homeStyles';
import { useAuth } from '../../src/contexts/AuthContext';


toast.configure();

function Intranet() {
  const [selectedButton, setSelectedButton] = useState('');
  const { logout } = useAuth();

  const menuDashboard = () => {
    switch (selectedButton) {
      case 'Informações': return <ResultadoQuizzes />;
      case 'Alterar senha': return <ResultadoQuizzes />;
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
