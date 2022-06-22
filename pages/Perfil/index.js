import React, { useEffect } from 'react';
import { useAuth } from '../../src/contexts/AuthContext';
import {
  ContainerDatas, AddressData, InsidePaper, PerfilTitle
} from '../../styles/perfilStyles';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import MyDatasEdit from '../../src/components/MyDatasEdit';

toast.configure();

export default function MyDatas() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  async function loadUser() {
    try {
      const response = await api.get(`/user/${user.firebase_id}`);
      setUser(response.data);
    } catch (error) {
      console.error(error); //eslint-disable-line
    }
  }

  function dataNascimentoFormatada(bdate) {
    const data = new Date(bdate);
    const dia = data.getDate().toString();
    const diaF = dia.length === 1 ? `0${dia}` : dia;
    const mes = (data.getMonth() + 1).toString(); // +1 pois no getMonth Janeiro começa com zero.
    const mesF = mes.length === 1 ? `0${mes}` : mes;
    const anoF = data.getFullYear();
    return `${diaF}/${mesF}/${anoF}`;
  }

  useEffect(() => {
    loadUser();
  }, []);

  if (user) {
    return (
      <ContainerDatas >
        <InsidePaper>
          <PerfilTitle>Dados do usuário:</PerfilTitle>
          <AddressData>
            <b>Nome:</b>
            {' '}
            {user.name}
          </AddressData>
          <AddressData>
            <b>Email:</b>
            {' '}
            {user.email}
          </AddressData>
          <AddressData>
            <b>CPF:</b>
            {' '}
            {user.cpf}
          </AddressData>
          <AddressData>
            <b>Data de Nascimento:</b>
            {' '}
            {dataNascimentoFormatada(user.birth_date)}
          </AddressData>
          <AddressData>
            <b>Telefone:</b>
            {' '}
            {user.phone}
          </AddressData>
          <MyDatasEdit />
        </InsidePaper>
      </ContainerDatas>
    );
  }
  return (() => {
    router.push('/404');
    toast('Erro ao obter dados do usuário', { position: toast.POSITION.BOTTOM_RIGHT });
  });
}
