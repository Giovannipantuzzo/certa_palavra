import React, { useState } from 'react';
import {
  ContainerInternalChangePassword, BoxInternalChangePassword,
  InternalChangePasswordTextH1, InternalChangePasswordTextP, InternalChangePasswordButtonContainer,
  InternalChangePasswordButton, PopUpInternalChangePassword, PopUpInternalChangePasswordH1,
  PopUpInternalChangePasswordP, GroupButtonsInternalChangePassword, SendButtonInternalChangePassword,
  CancelButtonInternalChangePassword,
} from '../../../styles/InternalChangePasswordStyles';
import { toast } from 'react-toastify';
import { Modal } from '@material-ui/core';
import { useRouter } from 'next/router';
// import withAuthUser from '../../../../src/components/WithAuth/WithAuthUser';

const InternalChangePassword = () => {
  const [open, setOpen] = useState(false);
  const { email } = JSON.parse(localStorage.getItem('user'));
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const JSONToSend = JSON.stringify({ email });
  const router = useRouter();

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      await managerService.sendResetEmail(JSONToSend);
      router.push('/login');
      toast.success('Email enviado com sucesso!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    } catch {
      toast.error('Email não cadastrado!!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  return (
    <ContainerInternalChangePassword>
      <BoxInternalChangePassword>
        <InternalChangePasswordTextH1>Alterar Senha</InternalChangePasswordTextH1>
        <InternalChangePasswordTextP>
          Clique no botão abaixo para que um link seja enviado para o seu
          email com os dados de alteração de senha.
        </InternalChangePasswordTextP>
        <InternalChangePasswordButtonContainer>
          <InternalChangePasswordButton type="submit" onClick={handleOpen}>Enviar</InternalChangePasswordButton>
        </InternalChangePasswordButtonContainer>
      </BoxInternalChangePassword>
      <Modal open={open} onClose={handleClose} style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}>
        <PopUpInternalChangePassword>
          <PopUpInternalChangePasswordH1>Recuperação de senha</PopUpInternalChangePasswordH1>
          <PopUpInternalChangePasswordP>Você tem certeza que deseja enviar um email para recuperação de senha?</PopUpInternalChangePasswordP>
          <GroupButtonsInternalChangePassword>
            <CancelButtonInternalChangePassword type="submit" onClick={handleClose}>Cancelar</CancelButtonInternalChangePassword>
            <SendButtonInternalChangePassword type="submit" onClick={handleClick}>Enviar</SendButtonInternalChangePassword>
          </GroupButtonsInternalChangePassword>
        </PopUpInternalChangePassword>
      </Modal>
    </ContainerInternalChangePassword>
  );

};

export default InternalChangePassword;
