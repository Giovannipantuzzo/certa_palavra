import styled from 'styled-components';
import {
  Form, FormControl, FormGroup,
} from 'react-bootstrap';

export const Title = styled.h1`
display: flex;
align-items: center;
justify-content: center;
margin-top: 5%;
margin-bottom: 3%;
color: ${({ theme }) => theme.colors.primary};
@media (max-width: 560px) {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2%;
  font-size: 18pt;
}
`;

export const ImageContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (max-width: 500px) {
      width: 90%;
    }
`;

export const Edit = styled.div`
  display: flex;
  width: 30%;
  justify-content: center;
  background-color: white;
  border-radius: 5px;
`;

export const MyFormGroup = styled(FormGroup)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 2%;
  margin-right: 2%;
`;

export const Phone = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: row;
  margin-left: 30px;
  margin-right: 2%;
  @media (max-width: 700px) {
    margin-left: 2%;
  }
`;

export const Name = styled.div`
  padding: 1%;
`;
export const NumbersForms = styled.div`
  flex-direction: row;
  display: flex;
  padding: 1%;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
export const DDD = styled.div`
  flex-direction: row;
  display: flex;
  margin-right: 10px;
`;

export const PhoneFormControl = styled(FormControl)`
  display: flex;
  width: 100%;
  margin-right: 2%;
  @media (max-width: 630px) {
    width: 90%;
  }
  @media (max-width: 450px) {
    width: 142px;
  }
`;
export const DDDFormControl = styled(FormControl)`
  display: flex;
  width: 55px;
  font-size: 15px;
  flex-direction: row;
`;

export const Register = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.green};
  border-radius: 3px;
  padding-bottom: 5%;
  width: 50%;
  background: #FFF;
  @media (max-width: 450px) {
    width: 90%;
  }
`;

export const Body = styled.div`
  height: 70vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10%;
  padding-bottom: 10%;
  justify-content: center;
  border-radius: 5px;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 5%;
`;
export const FormRegister = styled(Form)``;

export const Submit = styled.button`
  margin-top: 30px;
  height: 40px;
  width: 150px;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.green};
  color: black;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  @media (max-width: 620px) {
    width: 40%;
  }
`;

export const CancelSubmit = styled.button`
  margin-top: 30px;
  height: 40px;
  width: 150px;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.green};
  color: black;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  @media (max-width: 620px) {
    width: 40%;
  }
`;

export const ContainerDatas = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-top: 5%;
  padding-bottom: 5%;
  @media (max-width: 560px) {
    flex-direction: column;
  }
`;
ContainerDatas.BoxDatas = styled.div`
  display: flex;
  font: 1.5rem Roboto;
  flex-direction: column;
  width: 65%;
  border-color: black;
  border-radius: 5px;
  align-items: left;
  line-height: 100%;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  @media (max-width: 976px) {
    width: 100%;
    margin-bottom: 2%;
  }
  @media (max-width: 560px) {
    width: 80%;
    font-size: 87.5%;
  }
`;
