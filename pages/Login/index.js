import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';
import { toast } from 'react-toastify';
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
  ForgotPassword,
  Divider,
} from '../../src/components/FormComponents';
import { useAuth } from '../../src/contexts/AuthContext';
import ModalFailedLogin from '../../src/components/ModalFailedLogin';
import api from '../../src/utils/api';

moment.locale('pt-br');

toast.configure();

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState('');

  const {
    login,
  } = useAuth();
  /*eslint-disable*/

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  const handleClickClose = () => {
    setShowModal(false);
  };


  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const res = await api.get('attempts/' + email);
      let time;
      if (res.data.attempts > 2 && moment() < moment(res.data.lock_time)) {
        setShowModal(true);
        if (res.data.attempts >= 4) time = moment(res.data.lock_time).add(5, 'minutes').fromNow();
        else time = moment(res.data.lock_time).fromNow();
        setContent(time);
        toast('Usuário bloqueado', { position: toast.POSITION.BOTTOM_RIGHT });
      }
      login(email, password, setShowModal, setContent);
    } catch (error) {
      console.error(error); //eslint-disable-line
    }
  }


  return (
    <>
      <Body>
        <Body.Left>
          <Image
            src="/loginFoto.png"
            alt=""
            width="450"
            height="300"
          />
        </Body.Left>
        <Divider width="1" display="block" size="300" />
        <Body.Right>
          <Formulary onSubmit={handleSubmit}>
            <TopFormulary>
              <TitleLogin>Bem-vindo de volta!</TitleLogin>
              <SubtitleLogin>
                Por favor, entre com seu email e sua senha:
              </SubtitleLogin>
            </TopFormulary>
            <ItemFormulary>
              <TextBox
                type="text"
                placeholder="Email"
                onChange={handleEmailChange}
                value={email}
              />
            </ItemFormulary>
            <ItemFormulary>
              <TextBox
                type="password"
                placeholder="Senha"
                onChange={handlePasswordChange}
                value={password}
              />
            </ItemFormulary>
            <ItemFormulary>
              <Link href="/Esqueci-minha-senha">
                <ForgotPassword>Esqueceu a senha?</ForgotPassword>
              </Link>
            </ItemFormulary>
            <BottomFormulary>
              <Submit type="submit">Entrar</Submit>
            </BottomFormulary>
          </Formulary>
          {showModal && (
            <ModalFailedLogin
              content={content}
              close={handleClickClose}
            />
          )}
        </Body.Right>
      </Body>
    </>
  );
}

export default Login;
