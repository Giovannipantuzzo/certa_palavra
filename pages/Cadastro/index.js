import { useState } from 'react';
import {
  FormLabel,
} from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import api from '../../src/utils/api';
import { BodyUser, ItemFormulary } from '../../src/components/BodyForms';
import 'react-toastify/dist/ReactToastify.css';
import {
  MyFormGroup, Pass, NumbersForms, DDD,
  Subtitle, Register,
  Buttons, FormRegister, Submit, MyFormGroupPass, MyFormGroupConfirmPass, MyFormGroupDDD
} from '../../styles/cadastroStyles';
import { TextBox2, Senha, ConfirmarSenha, TextDDD, Select } from '../../src/components/FormComponents';
import withAuthAdmin from '../../src/components/Authentication/WithAuthAdmin';

import ptBR from 'date-fns/locale/pt-BR';

toast.configure();

const Signup = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [ddd, setDdd] = useState('');
  const [telephone, setTelephone] = useState('');
  const [date, setDate] = useState(new Date());
  const [userType, setUserType] = useState('');
  const router = useRouter();
  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }
  function handleCpfChange(event) {
    setCpf(event.target.value);
  }
  function handleDddChange(event) {
    setDdd(event.target.value);
  }
  function handleTelephoneChange(event) {
    setTelephone(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const regex = new RegExp('.+@.+..+');
    if (name?.length === 0) {
      toast('Nome inválido!', { position: toast.POSITION.BOTTOM_RIGHT });
      return;
    }
    if (lastName?.length === 0) {
      toast('Sobrenome inválido!', { position: toast.POSITION.BOTTOM_RIGHT });
      return;
    }
    if (!regex.test(email)) {
      toast('Email inválido!', { position: toast.POSITION.BOTTOM_RIGHT });
      return;
    }
    if (password.length < 6) {
      toast('A senha deve possuir pelo menos 6 digitos', { position: toast.POSITION.BOTTOM_RIGHT });
      return;
    }
    if (password !== confirmPassword) {
      toast('A senha inserida deve ser a mesma', { position: toast.POSITION.BOTTOM_RIGHT });
      return;
    }
    if (cpf?.length !== 11) {
      toast('CPF inválido', { position: toast.POSITION.BOTTOM_RIGHT });
      return;
    }
    if (telephone?.length !== 9) {
      toast('Número inválido', { position: toast.POSITION.BOTTOM_RIGHT });
      return;
    }
    if (ddd?.length !== 2) {
      toast('DDD inválido', { position: toast.POSITION.BOTTOM_RIGHT });
      return;
    }
    const body = {
      type: 'buyer',
      name: name + ' ' + lastName,
      birth_date: date,
      email,
      password,
      cpf,
      phone: ddd + telephone,
    };
    try {
      await api.post('/user', body);
      toast('Sucesso', { position: toast.POSITION.BOTTOM_RIGHT });
      router.push('/Home');
    } catch (error) {
      console.error(error);
      toast('Erro', { position: toast.POSITION.BOTTOM_RIGHT });
    }
  }

  return (
    <>
      <BodyUser>
        <BodyUser.center>
          <Register>
            <FormRegister>

              <Subtitle>Cadastro</Subtitle>
              <MyFormGroup>
                <FormLabel>Nome</FormLabel>
                <ItemFormulary>
                  <TextBox2
                    type="text"
                    placeholder="Nome"
                    required
                    value={name}
                    onChange={handleNameChange}
                  />
                </ItemFormulary>
              </MyFormGroup>

              <MyFormGroup>
                <FormLabel>Sobrenome</FormLabel>
                <TextBox2
                  type="text"
                  placeholder="Sobrenome"
                  required
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </MyFormGroup>

              <MyFormGroup>
                <FormLabel>Data de Nascimento</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                  <DatePicker
                    value={date}
                    onChange={(newDate) => { setDate(newDate); }}
                    inputFormat="dd/MM/yyyy"
                    style={{
                      color: 'red'
                    }}
                    renderInput={(props) => (
                      <TextField {...props} helperText={props.error ? "Por favor, selecione uma data válida" : "Selecione uma data"}
                        style={{
                          width: '100%',
                          paddingTop: '4px',
                          borderRadius: '5px',
                          border: '1px solid ${({ theme }) => theme.colors.baseGray}',
                          background: '#F8F8F8',
                        }} />
                    )}
                  />
                </LocalizationProvider>

              </MyFormGroup>
              <MyFormGroup>
                <FormLabel>Email</FormLabel>
                <TextBox2
                  type="email"
                  placeholder="Email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  required
                  title="Digite um email válido"
                  value={email}
                  onChange={handleEmailChange}
                />
              </MyFormGroup>
              <MyFormGroup>
                <FormLabel>Tipo</FormLabel>
                <Select
                  id={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  value={userType}
                >
                  <option value="">Selecione o tipo do usuario</option>
                  <option value="User">Usuario</option>
                  <option value="Corretor">Corretor</option>
                </Select>
              </MyFormGroup>
              <Pass>
                <MyFormGroupPass>
                  <FormLabel>Senha</FormLabel>
                  <Senha
                    type="password"
                    placeholder="Senha"
                    required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Deve conter pelo menos um número e uma letra maiúscula e minúscula e pelo menos 8 ou mais caracteres"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </MyFormGroupPass>
                <MyFormGroupConfirmPass>
                  <FormLabel>Confirmar Senha</FormLabel>
                  <ConfirmarSenha
                    type="password"
                    placeholder="Senha"
                    required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </MyFormGroupConfirmPass>
              </Pass>
              <NumbersForms>
                <MyFormGroup>
                  <FormLabel>CPF</FormLabel>
                  <TextBox2
                    type="numbers"
                    placeholder="CPF"
                    pattern="[0-9]$"
                    required
                    title="Digite um CPF válido"
                    value={cpf}
                    onChange={handleCpfChange}
                  />
                </MyFormGroup>
                <DDD>
                  <MyFormGroupDDD>
                    <FormLabel>DDD</FormLabel>
                    <TextDDD
                      type="numbers"
                      placeholder="(00)"
                      pattern="[0-9]$"
                      required
                      value={ddd}
                      onChange={handleDddChange}
                    />
                  </MyFormGroupDDD>
                </DDD>
                <MyFormGroup>
                  <FormLabel>Telefone</FormLabel>
                  <TextBox2
                    type="numbers"
                    placeholder="00000-0000"
                    pattern="[0-9]$"
                    required
                    value={telephone}
                    onChange={handleTelephoneChange}
                  />
                </MyFormGroup>
              </NumbersForms>
              <Buttons>
                <Submit onClick={handleSubmit}>Cadastrar</Submit>

                <br />
              </Buttons>
            </FormRegister>

          </Register>
        </BodyUser.center>

      </BodyUser>
    </>
  );
};

export default withAuthAdmin(Signup);
