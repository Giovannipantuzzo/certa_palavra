import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FaFilter } from 'react-icons/fa';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { useAuth } from '../../contexts/AuthContext';
import {
  ContainerCardsRedaction, DivisionCardsRedaction,
  TitleCardsRedactionPage, TitleCardsRedactionPageH1, LineTableCardsRedaction,
  LoaderCardsRedaction, BodyRedactionCard, CardRedaction,
  TitleCardRedaction, TitleCardRedactionP, DescriptionCardRedactions,
  DescriptionCardRedactionsP, RedactionsIcons, ContainerRedactionStatus, ContainerRedactionDate,
} from '../../../styles/mainDashboardStyle';
import ModalRedacao from '../ModalRedacao';
import DashboardFilter from '../DashboardFilter';
import api from '../../utils/api';

function dataNascimentoFormatada(bdate) {
  const data = new Date(bdate);
  const dia = data.getDate().toString();
  const diaF = dia.length === 1 ? `0${dia}` : dia;
  const mes = (data.getMonth() + 1).toString(); // +1 pois no getMonth Janeiro começa com zero.
  const mesF = mes.length === 1 ? `0${mes}` : mes;
  const anoF = data.getFullYear();
  return `${diaF}/${mesF}/${anoF}`;
}

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
      console.log('🚀 ~ file: index.js ~ line 51 ~ rateRedaction ~ rate', rate);
      // await api.put('', 'like');
    } else {
      console.log('🚀 ~ file: index.js ~ line 54 ~ rateRedaction ~ rate', rate);
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
          <TitleCardsRedactionPageH1>Redações Enviadas: {pendingData.length}</TitleCardsRedactionPageH1>
          {user?.type === 'Corretor' ? (
            <FaFilter
              onClick={handleFilter}
              style={{
                color: '#91ca6c',
                marginTop: '10px',
                marginRight: '5px',
                cursor: 'pointer',
              }}
            />
          ) : <ModalRedacao />}
        </TitleCardsRedactionPage>
        <LineTableCardsRedaction />
        {loading ? (
          <LoaderCardsRedaction>
            <CircularProgress size={35} color="inherit" />
          </LoaderCardsRedaction>
        ) : (
          <div>
            {pendingData && pendingData.map((redaction) => (
              <BodyRedactionCard>
                <CardRedaction>
                  <TitleCardRedaction type="button" onClick={handleOpen}>
                    <TitleCardRedactionP>
                      {' '}
                      {redaction.title}
                    </TitleCardRedactionP>
                    <ContainerRedactionDate>
                      <h5>Data de envio: {dataNascimentoFormatada(redaction?.created_at)}</h5>
                    </ContainerRedactionDate>
                  </TitleCardRedaction>
                </CardRedaction>
              </BodyRedactionCard>
            ))}
          </div>
        )}
        <TitleCardsRedactionPage>
          <TitleCardsRedactionPageH1>
            Redações Corrigidas:
            {' '}
            {data?.length}
            {' '}
          </TitleCardsRedactionPageH1>
        </TitleCardsRedactionPage>
        <LineTableCardsRedaction />
        {loading ? (
          <LoaderCardsRedaction>
            <CircularProgress size={35} color="inherit" />
          </LoaderCardsRedaction>
        ) : (
          <div>
            {data && data.map((redaction) => (
              <>
                <BodyRedactionCard>
                  <CardRedaction>
                    <TitleCardRedaction type="button" onClick={handleOpen2}>
                      <TitleCardRedactionP>
                        {' '}
                        {redaction.title}
                      </TitleCardRedactionP>
                      <ContainerRedactionStatus>
                        <h5>{redaction?.final_grade}</h5>
                      </ContainerRedactionStatus>
                      <KeyboardArrowDownIcon style={{ color: '#91ca6c' }} />
                    </TitleCardRedaction>
                  </CardRedaction>
                </BodyRedactionCard>
                {
                  open2 === true && (
                    <DescriptionCardRedactions>
                      <DescriptionCardRedactionsP>
                        <b>Corrigida em:</b>
                        {' '}
                        {dataNascimentoFormatada(redaction?.corrected_at)}
                      </DescriptionCardRedactionsP>
                      <RedactionsIcons>
                        <AiOutlineLike
                          style={{
                            height: '25px',
                            width: '25px',
                            marginRight: '2%',
                            color: `${data === true ? '#91ca6c' : 'black'}`,
                            cursor: 'pointer',
                          }}
                          onClick={() => rateRedaction('like')}
                        />
                        <AiOutlineDislike
                          style={{
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
              </>
            ))}
          </div>
        )}
      </DivisionCardsRedaction>
      {
        openFilter && (
          <DashboardFilter
            handleClose={handleFilter}
            setData={setData}
            setPendingData={setPendingData}
          />
        )
      }
    </ContainerCardsRedaction>
  );
}
