import styled from 'styled-components';

export const TitleLogin = styled.h1`
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 3remD;
  font-weight: 700;
  align-itens: center;
`;

export const TitleStore = styled.h1`
  margin-bottom: 0px;
  font-size: 2.3rem;
  font-weight: 700;
`;

export const SubtitleLogin = styled.p`
  font-size: 20px;
  font-weight: 100;
`;

export const SubtitleStore = styled.h1`
  margin-bottom: 10px;
  font-size: 1.3em;
  font-weight: 100;
`;

export const Text = styled.p`
  margin-top: 0px;
  margin-right: 10px; // Campo Isento de IE* form Store
  font-size: 1rem;
  margin-bottom: 0px;
`;

export const Text2 = styled.p`
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 15px;
  margin-bottom: 0px;
  font-weight: bold;
`;

export const SubText = styled.p`
  margin-top: 3px;
  margin-left: 5px;
  font-size: 0.7rem;
  margin-bottom: 5px;
`;

export const Select = styled.select`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 25px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: #F8F8F8;
`;

export const TextBox = styled.input`
  width: 90%;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 25px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: #F8F8F8;
`;

export const TextBox2 = styled.input`
  width: 100%;
  padding: 5px;
  height: 25px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: #F8F8F8;
`;

export const Senha = styled.input`
  width: 96%;
  padding: 5px;
  height: 25px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: #F8F8F8;

  @media (max-width: 300px) {
  width: 100%;
  }
`;

export const ConfirmarSenha = styled.input`
  width: 100%;
  padding: 5px;
  height: 25px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: #F8F8F8;

`;

export const TextDDD = styled.input`
  width: 90%;
  padding: 5px;
  height: 25px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: #F8F8F8;
  
  @media (max-width: 300px) {
  width: 100%;
  }
`;

export const ForgotPassword = styled.p`
  margin-top: 0px;
  width: 90%;
  font-size: 15px;
  justify-content: right;
  text-align: end;
  font-weight: 700;
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Submit = styled.button`
    height: 40px;
    width: 150px;
    font-family: Roboto;
    font-size: 20px;
    font-weight: 500;
    background-color: ${({ theme }) => theme.colors.green};
    color: white;
    border: 0;
    border-radius: 5px;
    cursor: pointer;
`;

export const CreateAccount = styled.p`
  margin-top: 5px;
  font-weight: 700;
  font-size: 15px;
`;

CreateAccount.Right = styled.p` 
  font-size: 15px;
  margin-top: 5px;
  margin-left: 5px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.pink};
  cursor: pointer;
`;

export const Divider = styled.hr`
  @media screen and (max-width: 1200px) {
        display: none !important;
    }
`;
