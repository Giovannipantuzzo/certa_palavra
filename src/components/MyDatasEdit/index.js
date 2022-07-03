import React, { useState } from 'react';
import { FormControl, FormLabel } from 'react-bootstrap';
import 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import { notification } from 'antd';
import 'antd/dist/antd.css';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { useAuth } from '../../contexts/AuthContext';
import { Body } from '../BodyForms';
import WindowDivider from '../WindowDivider';
import api from '../../utils/api';
import {
  Title, Edit, MyFormGroup, Phone, Name, NumbersForms, DDD, PhoneFormControl,
  DDDFormControl, Register, Buttons, FormRegister, Submit, CancelSubmit,
  ContainerDatas,
} from '../../../styles/myDatasEdit';

export default function MyDatasEdit() {
  const { user, setUser } = useAuth();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!user) {
    return (
      <ContainerDatas>
        <ContainerDatas.BoxDatas>
          <p>Dados do usuário não encontrados</p>
        </ContainerDatas.BoxDatas>
      </ContainerDatas>
    );
  }

  const [name, setName] = useState(user.name);
  const [cpf, setCpf] = useState(user.cpf);
  const [ddd, setDdd] = useState(user.phone.substring(0, 2));
  const [phone, setPhone] = useState(user.phone.substring(2));
  const router = useRouter();

  async function handleSubmit(event) {
    setOpen(false);
    event.preventDefault();
    if (cpf?.length !== 11) {
      alert('CPF inválido');
      return;
    }
    if (phone?.length !== 9) {
      alert('Número inválido');
      return;
    }
    if (ddd?.length !== 2) {
      alert('Número inválido');
      return;
    }
    const body = {
      name,
      cpf,
      phone: ddd + phone,
    };
    try {
      api.put(`/user/${user.firebase_id}`, body).then((response) => {
        setUser(response.data);
      });
      notification.open({
        message: 'Sucesso!',
        description: 'Alteraçao realizada com sucesso.',
        className: 'ant-notification',
        top: '100px',
        style: {
          width: 600,
        },
      });
      router.push('/User/Perfil/MyDatas');
    } catch (error) {
      console.error(error);
      notification.open({
        message: 'Erro!',
        description: 'Erro ao atualizar dados.',
        className: 'ant-notification',
        top: '100px',
        style: {
          width: 600,
        },
      });
    }
  }
  const corpo = (
    <Body>
      <WindowDivider />
      <Body.Right>
        <Register>
          <FormRegister>
            <Title>Formulário de edição</Title>
            <Name>
              <MyFormGroup>
                <FormLabel>Nome</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Nome"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </MyFormGroup>
            </Name>
            <NumbersForms>
              <MyFormGroup>
                <FormLabel>CPF</FormLabel>
                <FormControl
                  type="number"
                  placeholder="CPF"
                  pattern="[0-9]$"
                  required
                  title="Digite um CPF válido"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </MyFormGroup>
              <Phone>
                <DDD>
                  <MyFormGroup>
                    <FormLabel>DDD</FormLabel>
                    <DDDFormControl
                      type="numbers"
                      placeholder="(00)"
                      pattern="[0-9]$"
                      required
                      value={ddd}
                      onChange={(e) => setDdd(e.target.value)}
                    />
                  </MyFormGroup>
                </DDD>
                <MyFormGroup>
                  <FormLabel>Telefone</FormLabel>
                  <PhoneFormControl
                    type="number"
                    placeholder="00000-0000"
                    pattern="[0-9]$"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </MyFormGroup>
              </Phone>
            </NumbersForms>
            <Buttons>
              <CancelSubmit onClick={handleClose}>Cancelar</CancelSubmit>
              <Submit onClick={handleSubmit}>Atualizar</Submit>
            </Buttons>
          </FormRegister>
        </Register>
      </Body.Right>
    </Body>
  );
  return (
    <Edit>
      <Button onClick={handleOpen} style={{
        backgroundColor: '#91ca6c',
        color: 'black',
        width: '100%',
      }}>Editar</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {corpo}
      </Modal>
    </Edit >
  );
}
