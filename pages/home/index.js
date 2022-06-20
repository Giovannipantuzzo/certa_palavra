import React, { useState } from 'react';
import { toast } from 'react-toastify';
import MenuHome from '../../src/components/MenuHome';
import {
  MeanHomeContainer,
  SideMenuDashboard,
  MeanDashboard,
} from '../../styles/homeStyles';

toast.configure();

function Intranet() {
  const [selectedButton, setSelectedButton] = useState('');
  const menuDashboard = () => {
    switch (selectedButton) {
      case 'Informações': return <ResultadoQuizzes />;
      case 'Alterar senha': return <ResultadoQuizzes />;
      case 'Sair': return <MainDashboard />;

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
