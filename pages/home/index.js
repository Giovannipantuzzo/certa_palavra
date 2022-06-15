import React, { useState } from 'react';
import { toast } from 'react-toastify';
import menuHome from '../../src/components/MenuHome';
import {
  meanHomeContainer,
  sideMenuDashboard,
  meanDashboard,
} from '../../styles/homeStyles';

toast.configure();

function Intranet() {
  const [selectedButton, setSelectedButton] = useState('');

  const menuDashboard = () => {
    switch (selectedButton) {
      case 'Enquetes': return <ResultadoQuizzes />;

      default: return <div />;
    }
  };

  return (
    <meanHomeContainer>
      <sideMenuDashboard>
        <menuHome setSelectedButton={setSelectedButton} selectedButton={selectedButton} />
      </sideMenuDashboard>
      <meanDashboard>
        {menuDashboard()}
      </meanDashboard>
    </meanHomeContainer>
  );
}

export default Intranet;
