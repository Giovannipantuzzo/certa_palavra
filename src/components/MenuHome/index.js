import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import {
  MenuSidepage,
  MenuSideContainer,
} from '../../../styles/menuHomeStyles';
import '../../../styles/menuHome.module.css';

const buttons = [
  { buttonName: 'Home' },
  { buttonName: 'Informações' },
  { buttonName: 'Alterar senha' },
  { buttonName: 'Sair' },
];

export default function MenuHome({ setSelectedButton, selectedButton }) {
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

            {buttons.map((button) => (
              <Button
                key={`${button.buttonName}`}
                className={defineBackgroundColor(button.buttonName)}
                onClick={() => setSelectedButton(button.buttonName)}>{button.buttonName}
              </Button>
            ))}

          </ButtonGroup>
        </MenuSideContainer>
      </MenuSidepage>
    </Box>
  );
}
