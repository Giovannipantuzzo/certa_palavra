import React, { useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import { useMediaQuery } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import {
  ContainerCardsRedaction, DivisionCardsRedaction,
  TitleCardsRedactionPage, TitleCardsRedactionPageH1, LineTableCardsRedaction,
  LoaderCardsRedaction, BodyRedactionCard, CardRedaction,
  TitleCardRedaction, TitleCardRedactionP, DescriptionCardRedactions,
  DescriptionCardRedactionsP,
} from '../../../styles/mainDashboardStyle'
import ModalRedacao from '../ModalRedacao';

// const matches = useMediaQuery('(max-width:411px)');

// const cellFontProps = {
//   sx: matches
//     && {
//     display: 'none',
//   },
// };

export default function MainDashboard() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const { user } = useAuth();

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleOpen2 = () => {
    setOpen2(!open2);
  };

  return (
    <ContainerCardsRedaction>
      <DivisionCardsRedaction>
        <TitleCardsRedactionPage>
          <TitleCardsRedactionPageH1>Redações Corrigidas</TitleCardsRedactionPageH1>
          <ModalRedacao />
        </TitleCardsRedactionPage>
        <LineTableCardsRedaction />
        {loading ? (
          <LoaderCardsRedaction>
            <CircularProgress size={35} color="inherit" />
          </LoaderCardsRedaction>
        ) : (
          <>
            <BodyRedactionCard>
              <CardRedaction>
                <TitleCardRedaction type="button" onClick={handleOpen}>
                  <TitleCardRedactionP>
                    {' '}
                    redação 1
                  </TitleCardRedactionP>
                  <KeyboardArrowDownIcon style={{ color: `${({ theme }) => theme.colors.primary}` }} />
                </TitleCardRedaction>
              </CardRedaction>
            </BodyRedactionCard>

            {open === true && (
              <DescriptionCardRedactions>
                <DescriptionCardRedactionsP>Redação aqui</DescriptionCardRedactionsP>
              </DescriptionCardRedactions>
            )}
          </>
        )}
        <TitleCardsRedactionPage>
          <TitleCardsRedactionPageH1>Redações Enviadas</TitleCardsRedactionPageH1>
          {/* <ModalEnquete /> */}
        </TitleCardsRedactionPage>
        <LineTableCardsRedaction />
        {loading ? (
          <LoaderCardsRedaction>
            <CircularProgress size={35} color="inherit" />
          </LoaderCardsRedaction>
        ) : (
          <>
            <BodyRedactionCard>
              <CardRedaction>
                <TitleCardRedaction type="button" onClick={handleOpen2}>
                  <TitleCardRedactionP>
                    {' '}
                    redação 2
                  </TitleCardRedactionP>
                  <KeyboardArrowDownIcon style={{ color: `${({ theme }) => theme.colors.primary}` }} />
                </TitleCardRedaction>
              </CardRedaction>
            </BodyRedactionCard>

            {open2 === true && (
              <DescriptionCardRedactions>
                <DescriptionCardRedactionsP>Redação aqui</DescriptionCardRedactionsP>
              </DescriptionCardRedactions>
            )}
          </>
        )}
      </DivisionCardsRedaction>
    </ContainerCardsRedaction>
  );
}
