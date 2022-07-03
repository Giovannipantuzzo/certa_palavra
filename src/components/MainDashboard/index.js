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
  DescriptionCardRedactionsP, RedactionsIcons, ContainerRedactionStatus, ContainerRedactionDate,
} from '../../../styles/mainDashboardStyle'
import ModalRedacao from '../ModalRedacao';
import { FaFilter } from 'react-icons/fa';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import DashboardFilter from '../DashboardFilter';
import api from '../../utils/api';

// const matches = useMediaQuery('(max-width:411px)');

// const cellFontProps = {
//   sx: matches
//     && {
//     display: 'none',
//   },
// };

export default function MainDashboard() {
  const [loading, setLoading] = useState(true);
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

  const rateRedaction = async (rate) => {
    if (rate === 'like') {
      console.log("🚀 ~ file: index.js ~ line 51 ~ rateRedaction ~ rate", rate)
      // await api.put('', 'like');
    } else {
      console.log("🚀 ~ file: index.js ~ line 54 ~ rateRedaction ~ rate", rate)
      // await api.put('', ''dislike'');
    }
    getRedactions();
  };

  const getRedactions = async () => {
    try {
      const response = await api.get('/redaction', {
        params: {
          status: true,
        }
      });

      const responsePending = await api.get('/redaction', {
        params: {
          status: false,
        }
      });

      setData(response?.data);
      setPendingData(responsePending?.data);
      setLoading(false);
    } catch (error) {
      router.push('/404');
      toast('Erro ao obter redações', { position: toast.POSITION.BOTTOM_RIGHT });
    }
  };

  useEffect(() => {
    getRedactions();
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
                  <ContainerRedactionDate>
                    <h5>Data de envio: 27/06/2022</h5>
                  </ContainerRedactionDate>
                </TitleCardRedaction>
              </CardRedaction>
            </BodyRedactionCard>
          </>
        )}
        <TitleCardsRedactionPage>
          <TitleCardsRedactionPageH1>Redações Corrigidas: {data?.lenght} </TitleCardsRedactionPageH1>
          {/* <ModalEnquete /> */}
        </TitleCardsRedactionPage>
        <LineTableCardsRedaction />
        {loading ? (
          <LoaderCardsRedaction>
            <CircularProgress size={35} color="inherit" />
          </LoaderCardsRedaction>
        ) : (
          <>
            {data && data.map((redaction) => {
              // { console.log("🚀 ~ file: index.js ~ line 122 ~ {data&&data.map ~ redaction", redaction) }
              <BodyRedactionCard>
                <CardRedaction>
                  <TitleCardRedaction type="button" onClick={handleOpen2}>
                    <TitleCardRedactionP>
                      {' '}
                      {/* {redaction.title} */}
                      redação aqui
                    </TitleCardRedactionP>
                    <ContainerRedactionStatus>
                      <h5>960</h5>
                    </ContainerRedactionStatus>
                    <KeyboardArrowDownIcon style={{ color: '#91ca6c' }} />
                  </TitleCardRedaction>
                </CardRedaction>
              </BodyRedactionCard>
              {
                open2 === true && (
                  <DescriptionCardRedactions>
                    <DescriptionCardRedactionsP>Redação aqui</DescriptionCardRedactionsP>
                    <RedactionsIcons>
                      <AiOutlineLike style={{
                        height: '25px',
                        width: '25px',
                        marginRight: '2%',
                        color: `${data === true ? '#91ca6c' : 'black'}`,
                        cursor: 'pointer',
                      }}
                        onClick={() => rateRedaction('like')}
                      />
                      <AiOutlineDislike style={{
                        height: '25px',
                        width: '25px',
                        color: `${data === true ? '#91ca6c' : 'black'}`,
                        cursor: 'pointer',
                      }}
                        onClick={() => rateRedaction('dislike')}
                      />
                    </RedactionsIcons>
                  </DescriptionCardRedactions>
                )
              }
            })}
          </>
        )}
      </DivisionCardsRedaction>
      {
        openFilter && (<DashboardFilter
          handleClose={handleFilter}
          setData={setData}
          setPendingData={setPendingData}
        />)
      }
    </ContainerCardsRedaction >
  );
}
