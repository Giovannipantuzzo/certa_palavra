import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { FaFilter } from 'react-icons/fa';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import {
  ContainerCardsRedaction, DivisionCardsRedaction,
  TitleCardsRedactionPage, TitleCardsRedactionPageH1, LineTableCardsRedaction,
  LoaderCardsRedaction, BodyRedactionCard, CardRedaction,
  TitleCardRedaction, TitleCardRedactionP, ContainerRedactionDate,
} from '../../../styles/mainDashboardStyle';
import ModalRedacao from '../ModalRedacao';
import DashboardFilter from '../DashboardFilter';
import api from '../../utils/api';
import FileSaver from 'file-saver';
import RedactionCard from '../RedactionCard';

toast.configure();

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
  const [comment, setComment] = useState(null);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleFilter = () => {
    setOpenFilter(!openFilter);
  };

  const handleComment = (value, field) => {
    setComment({ comment, [field]: value });
    console.log("🚀 ~ file: index.js ~ line 60 ~ commentOnRedaction ~ comment", comment)
  };

  const getDownload = async (file_url) => {
    try {
      FileSaver.saveAs(file_url, 'redação');
    } catch (error) {
      toast('Erro ao baixar arquivo', { position: toast.POSITION.BOTTOM_RIGHT });
    }
  };

  const rateRedaction = async (rate, redaction_id) => {
    try {
      if (rate === 'like') {
        await api.put(
          '/correctedRedactions',
          { rate: true, firebase_id: user.firebase_id, redaction_id },
        );
      } else {
        await api.put(
          '/correctedRedactions',
          { rate: false, firebase_id: user.firebase_id, redaction_id },
        );
      }
      getRedactions();
    } catch (error) {
      toast('Erro ao avaliar correção', { position: toast.POSITION.BOTTOM_RIGHT });
    }
  };

  const commentOnRedaction = async (redaction_id, comment) => {
    try {
      console.log("🚀 ~ file: index.js ~ line 91 ~ commentOnRedaction ~ redaction_id", redaction_id)
      console.log("🚀 ~ file: index.js ~ line 101 ~ commentOnRedaction ~ comment", comment)
      console.log("🚀 ~ file: index.js ~ line 99 ~ commentOnRedaction ~ firebase_id", firebase_id)

      await api.post(
        '/redactionComments',
        {
          firebase_id: user.firebase_id,
          redaction_id: redaction_id,
          comment: comment,
        },
      );

      getRedactions();
    } catch (error) {
      toast('Erro ao comentar sobre correção/redação', { position: toast.POSITION.BOTTOM_RIGHT });
    }
  };

  const getRedactions = async () => {
    let response;
    let responsePending;
    try {
      if (user?.type !== 'User') {
        if (user?.type === 'Corretor') {
          response = await api.get('/redaction', {
            params: {
              status: true,
              firebase_id: user.firebase_id,
              userType: user?.type,
            },
          });
        } else {
          response = await api.get('/redaction', {
            params: {
              status: true,
            },
          });
        }
        responsePending = await api.get('/redaction', {
          params: {
            status: false,
          },
        });
        console.log("🚀 ~ file: index.js ~ line 138 ~ getRedactions ~ responsePending", responsePending)
      } else {
        response = await api.get('/redaction', {
          params: {
            status: true,
            firebase_id: user.firebase_id,
            userType: user?.type,
          },
        });
        responsePending = await api.get('/redaction', {
          params: {
            status: false,
            firebase_id: user.firebase_id,
            userType: user?.type,
          },
        });
      }
      setData(response?.data);
      setPendingData(responsePending?.data);
      setLoading(false);
    } catch (error) {
      toast('Erro ao obter redações', { position: toast.POSITION.BOTTOM_RIGHT });
      setLoading(false);
    }
  };

  const handlePushEditor = (pendingRedaction) => {
    router.push({ pathname: '/Editor', query: { redaction_id: pendingRedaction.redaction_id, file_url: pendingRedaction.file_url } });
  };

  useEffect(() => {
    getRedactions();
  }, []);

  return (
    <ContainerCardsRedaction>
      <DivisionCardsRedaction>
        <TitleCardsRedactionPage>
          <TitleCardsRedactionPageH1>
            Redações
            {' '}
            {user?.type === 'Corretor'
              ? 'Pendentes' : 'Enviadas'}
            :
            {' '}
            {pendingData.length}
          </TitleCardsRedactionPageH1>
          {(user?.type === 'Admin' || user?.type === 'Corretor') ? (
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
                      <h5>
                        Data de envio:
                        {' '}
                        {dataNascimentoFormatada(redaction?.created_at)}
                      </h5>
                      {user?.type === 'Corretor' && (
                        <MdOutlineModeEditOutline
                          onClick={() => handlePushEditor(redaction)}
                          style={{
                            height: '20px', width: '20px', cursor: 'pointer', marginLeft: '5px',
                          }}
                        />
                      )}
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
              <RedactionCard
                redaction={redaction}
                rateRedaction={rateRedaction}
                commentOnRedaction={commentOnRedaction}
                handleComment={handleComment}
                comment={comment}
                getDownload={getDownload}
              />
            ))}
          </div>
        )}
        {
          openFilter && (
            <DashboardFilter
              handleClose={handleFilter}
              setData={setData}
              setPendingData={setPendingData}
              userId={user.firebase_id}
              userType={user.type}
            />
          )
        }
      </DivisionCardsRedaction>
    </ContainerCardsRedaction>
  );
}
