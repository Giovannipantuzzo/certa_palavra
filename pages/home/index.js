import React from 'react';
import './MenuLateral.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const buttons = [
  { buttonName: 'Dashboard' },
  { buttonName: 'Informações' },
];

const theme = createTheme({
  palette: {
    secondary: {
      main: '#264A6F',
    },
  },
});

function MenuLateral({ setSelectedButton, selectedButton }) {
  const defineBackgroundColor = (buttonType) => (selectedButton === buttonType
    ? 'menuSideClickButton'
    : 'menuSideGrupButton');

  return (
    <Box>
      <div className="menuSidepage">
        <div className="menuSideContainer">
          <ThemeProvider theme={theme}>
            <ButtonGroup
              className="menuSideAll"
              size="large"
              orientation="vertical"
              aria-label="vertical contained button group"
              variant="text"
              color="secondary"
            >

              {buttons.map((button) => (
                <Button key={`${button.buttonName}`} className={defineBackgroundColor(button.buttonName)} onClick={() => setSelectedButton(button.buttonName)}>{button.buttonName}</Button>
              ))}

            </ButtonGroup>
          </ThemeProvider>
        </div>
      </div>
    </Box>
  );
}

export default MenuLateral;
