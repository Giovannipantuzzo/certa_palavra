import { useState } from 'react';
import Image from 'next/image';
import { notification } from 'antd';
import 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import {
  Body,
  Formulary,
  TopFormulary,
  ItemFormulary,
  BottomFormulary,
} from '../../src/components/BodyForms';
import {
  TitleLogin,
  SubtitleLogin,
  TextBox,
  Submit,
  Divider,
} from '../../src/components/FormComponents';
import { useAuth } from '../../src/contexts/AuthContext';

const ForgetPass = () => {
  const [email, setEmail] = useState('');
  const { forgottenPassword } = useAuth();

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  async function sendResetEmail(event) {
    event.preventDefault();
    if (!email) {
      return notification.open({
        message: 'Erro!',
        description: 'Por favor digite um email válido!.',
        className: 'ant-notification',
        top: '100px',
        style: {
          width: 600,
        },
      });
    }
    try {
      await forgottenPassword(email);
      notification.open({
        message: 'Sucesso!',
        description: 'Email enviado com sucesso.',
        className: 'ant-notification',
        top: '100px',
        style: {
          width: 600,
        },
      });
    } catch (error) {
      notification.open({
        message: 'Erro!',
        description: 'Erro ao enviar email de redefinição usuário.',
        className: 'ant-notification',
        top: '100px',
        style: {
          width: 600,
        },
      });
    }
  }
  return (
    <>
      <Body>
        <Body.Left>
          <Image
            src="/images/BannerLogin.jpg"
            alt=""
            width="600"
            height="400"
          />
        </Body.Left>
        <Divider width="1" display="block" size="300" />
        <Body.Right>
          <Formulary onSubmit={sendResetEmail}>
            <TopFormulary>
              <TitleLogin>Esqueceu sua senha?</TitleLogin>
              <SubtitleLogin>
                Por favor, entre com seu email para enviarmos um email de
                redefinição
              </SubtitleLogin>
              <ItemFormulary>
                <TextBox
                  type="text"
                  placeholder="Email"
                  onChange={handleEmailChange}
                  value={email}
                />
              </ItemFormulary>
              <BottomFormulary>
                <Submit type="submit">Enviar</Submit>
              </BottomFormulary>
            </TopFormulary>
          </Formulary>
        </Body.Right>
      </Body>
    </>
  );
};
export default ForgetPass;
