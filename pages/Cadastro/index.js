import { useState } from 'react';
import Link from 'next/link';
import {
  FormLabel, FormGroup,
} from 'react-bootstrap';
import Image from 'next/image';
// import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import api from '../../src/utils/api';
import { BodyUser, ItemFormulary } from '../../src/components/BodyForms';
import WindowDivider from '../../src/components/WindowDivider';
import 'react-toastify/dist/ReactToastify.css';
import {
  WordFormGroup, MyFormGroup, Phone, Pass, NumbersForms, DDD,
  Subtitle, Register,
  Buttons, FormRegister, Submit, ButtonLogin,
} from '../../styles/cadastroStyles';
import { TextBox2 } from '../../src/components/FormComponents';

toast.configure();

export default function Signup() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [ddd, setDdd] = useState('');
  const [telephone, setTelephone] = useState('');
  const [date, setDate] = useState(new Date());
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
      router.push('/login');
    } catch (error) {
      console.error(error);
      toast('Erro', { position: toast.POSITION.BOTTOM_RIGHT });
    }
  }

  return (
    <>
      <BodyUser>
        <BodyUser.LeftUser>

          <Image src="/images/doguinho.jpg" alt="" width="450" height="483" />
        </BodyUser.LeftUser>
        <WindowDivider />
        <BodyUser.Right>
          <Register>
            <FormRegister>

              <Subtitle>Vamos Começar?</Subtitle>
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
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    value={date}
                    onChange={(newDate) => { setDate(newDate); }}
                    variant="inline"
                    format="dd/MM/yyyy"
                  />
                </MuiPickersUtilsProvider> */}

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
              <Pass>
                <MyFormGroup>
                  <FormLabel>Senha</FormLabel>
                  <TextBox2
                    type="password"
                    placeholder="Senha"
                    required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Deve conter pelo menos um número e uma letra maiúscula e minúscula e pelo menos 8 ou mais caracteres"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </MyFormGroup>
                <WordFormGroup>
                  <FormLabel>Confirmar Senha</FormLabel>
                  <TextBox2
                    type="password"
                    placeholder="Senha"
                    required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </WordFormGroup>
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
                <Phone>
                  <DDD>
                    <MyFormGroup>
                      <FormLabel>DDD</FormLabel>
                      <TextBox2
                        type="numbers"
                        placeholder="(00)"
                        pattern="[0-9]$"
                        required
                        value={ddd}
                        onChange={handleDddChange}
                      />
                    </MyFormGroup>
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
                </Phone>
              </NumbersForms>
              <Buttons>
                <Submit onClick={handleSubmit}>Cadastrar</Submit>

                <br />
                <FormGroup>
                  <FormLabel align="center">
                    Você já tem Cadastro?
                    <Link href="/login">
                      <ButtonLogin>Login</ButtonLogin>
                    </Link>
                  </FormLabel>
                </FormGroup>
              </Buttons>
            </FormRegister>

          </Register>
        </BodyUser.Right>

      </BodyUser>
    </>
  );
}
