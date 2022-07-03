import React, { useState, useEffect } from 'react';
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
import { FaFilter } from 'react-icons/fa';
import DashboardFilter from '../DashboardFilter';

// const matches = useMediaQuery('(max-width:411px)');

// const cellFontProps = {
//   sx: matches
//     && {
//     display: 'none',
//   },
// };

export default function MainDashboard() {
  const [loading, setLoading] = useState(false);
  const [pendingData, setPendingData] = useState([]);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const { user } = useAuth();

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleOpen2 = () => {
    setOpen2(!open2);
  };

  const handleFilter = () => {
    setOpenFilter(!openFilter);
  };

  useEffect(() => {
    setPendingData();
    setData();
  }, []);

  return (
    <ContainerCardsRedaction>
      <DivisionCardsRedaction>
        <TitleCardsRedactionPage>
          <TitleCardsRedactionPageH1>Redações Enviadas: 18</TitleCardsRedactionPageH1>
          {user?.type === 'Corretor' ? <FaFilter onClick={handleFilter} style={{
            color: '#91ca6c',
            marginTop: '10px',
            marginRight: '5px',
            cursor: 'pointer',
          }} /> : <ModalRedacao />}
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
                  <KeyboardArrowDownIcon style={{ color: '#91ca6c' }} />
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
          <TitleCardsRedactionPageH1>Redações Corrigidas: 12</TitleCardsRedactionPageH1>
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
                  <KeyboardArrowDownIcon style={{ color: '#91ca6c' }} />
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
      {openFilter && (<DashboardFilter
        handleClose={handleFilter}
        setData={setData}
        setPendingData={setPendingData}
      />)}
    </ContainerCardsRedaction>
  );
}
