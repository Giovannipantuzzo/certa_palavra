import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import {
  MenuSidepage,
  MenuSideContainer,
} from '../../../styles/menuHomeStyles';
import { useAuth } from '../../contexts/AuthContext';
import '../../../styles/menuHome.module.css';

const buttons = [
  { buttonName: 'Dashboard' },
  { buttonName: 'Informações' },
  { buttonName: 'Alterar senha' },
  { buttonName: 'Sair' },
];

const buttonsAdmin = [
  { buttonName: 'Dashboard' },
  { buttonName: 'Lista de corretores' },
  { buttonName: 'Alterar senha' },
  { buttonName: 'Sair' },
];

export default function MenuHome({ setSelectedButton, selectedButton }) {
  const { user } = useAuth();

  const defineBackgroundColor = (buttonType) => (selectedButton === buttonType
    ? 'menuSideClickButton'
    : 'menuSideGrupButton');

  return (
    <Box>
      <MenuSidepage>
        <MenuSideContainer>
          <ButtonGroup
            style={{ padding: '10px' }}
            size="large"
            orientation="vertical"
            aria-label="vertical contained button group"
            variant="text"
          >
            {user?.type === 'admin' ? (
              buttonsAdmin.map((button) => (
                <Button
                  key={`${button.buttonName}`}
                  style={{ color: 'white', borderColor: '#91ca6c' }}
                  className={defineBackgroundColor(button.buttonName)}
                  onClick={() => setSelectedButton(button.buttonName)}>{button.buttonName}
                </Button>
              ))
            ) : (
              buttons.map((button) => (
                <Button
                  key={`${button.buttonName}`}
                  style={{ color: 'white', borderColor: '#91ca6c' }}
                  className={defineBackgroundColor(button.buttonName)}
                  onClick={() => setSelectedButton(button.buttonName)}>{button.buttonName}
                </Button>
              ))
            )}
          </ButtonGroup>
        </MenuSideContainer>
      </MenuSidepage>
    </Box>
  );
}
