import React, { useState } from 'react';
import {
  BodyRedactionCard, CardRedaction,
  TitleCardRedaction, TitleCardRedactionP, DescriptionCardRedactions,
  DescriptionCardRedactionsP, RedactionsIcons, ContainerRedactionStatus,
  TextBox2, MyFormGroup, Download, ContainerDownload, BlockQuote, BlockQuoteDetail,
  BlockQuoteResp, BlockQuoteDetailResp, BlockQuoteDetailRespImage, BlockQuoteDetailRespImageContainer,
  BlockQuoteName,
} from '../../../styles/mainDashboardStyle';
import { AiOutlineLike, AiOutlineDislike, AiOutlineSend } from 'react-icons/ai';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useAuth } from '../../contexts/AuthContext';

function dataNascimentoFormatada(bdate) {
  const data = new Date(bdate);
  const dia = data.getDate().toString();
  const diaF = dia.length === 1 ? `0${dia}` : dia;
  const mes = (data.getMonth() + 1).toString(); // +1 pois no getMonth Janeiro começa com zero.
  const mesF = mes.length === 1 ? `0${mes}` : mes;
  const anoF = data.getFullYear();
  return `${diaF}/${mesF}/${anoF}`;
}

export default function RedactionCard({
  redaction, rateRedaction, getDownload, commentOnRedaction, handleComment,
  comment,
}) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <BodyRedactionCard>
        <CardRedaction>
          <TitleCardRedaction type="button" onClick={handleOpen}>
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
        open === true && (
          <DescriptionCardRedactions>
            <DescriptionCardRedactionsP>
              <b>Corrigida em:</b>
              {' '}
              {dataNascimentoFormatada(redaction?.corrected_at)}
            </DescriptionCardRedactionsP>
            <DescriptionCardRedactionsP>
              <b>Comentário do corretor:</b>
              {' '}
              {redaction?.description}
            </DescriptionCardRedactionsP>
            <ContainerDownload>
              <Download
                onClick={() => getDownload(redaction.file_url)}
              >
                Baixar arquivo
              </Download>
            </ContainerDownload>
            <RedactionsIcons>
              <AiOutlineLike
                style={{
                  height: '25px',
                  width: '25px',
                  marginRight: '2%',
                  color: `${redaction?.rate === true ? '#91ca6c' : 'black'}`,
                  cursor: 'pointer',
                }}
                onClick={() => rateRedaction('like', redaction.redaction_id)}
              />
              <AiOutlineDislike
                style={{
                  height: '25px',
                  width: '25px',
                  color: `${redaction?.rate === false ? '#91ca6c' : 'black'}`,
                  cursor: 'pointer',
                }}
                onClick={() => rateRedaction('dislike', redaction.redaction_id)}
              />
            </RedactionsIcons>
            <MyFormGroup>
              <TextBox2
                type="text"
                placeholder="Comentário"
                required
                value={comment}
                onChange={(e) => handleComment(e.target.value, 'comment')}
              />
              <AiOutlineSend
                style={{
                  cursor: 'pointer',
                  marginTop: '10px',
                  marginLeft: '10px',
                  color: '#91ca6c',
                }}
                onClick={() => commentOnRedaction(redaction.redaction_id)}
              />
            </MyFormGroup>
            {redaction?.comments?.map((response) => {
              return (response.firebase_id === user?.firebase_id ? (
                <BlockQuote>
                  <BlockQuoteDetail />
                  <p style={{ display: 'flex', marginLeft: '5px' }} >{response.comment}</p>
                </BlockQuote>
              ) : (
                <BlockQuoteResp>
                  <BlockQuoteDetailResp />
                  <p style={{ display: 'flex', marginLeft: '5px' }} >{response.comment}</p>
                  <BlockQuoteDetailRespImageContainer>
                    <BlockQuoteDetailRespImage src={user?.perfil_photo_url ? `${user?.perfil_photo_url}` : "/fotoPerfil.jpg"} alt="Perfil" width="25" height="25" />
                    <BlockQuoteName>{redaction.corrector?.name ? redaction.corrector.name : redaction.user.name}</BlockQuoteName>
                  </BlockQuoteDetailRespImageContainer>
                </BlockQuoteResp>
              ));
            })}
          </DescriptionCardRedactions>
        )
      }
    </>
  );
}
