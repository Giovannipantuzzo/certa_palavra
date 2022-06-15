import styled from 'styled-components';
import {
  Form, FormControl, FormGroup,
} from 'react-bootstrap';

export const WordFormGroup = styled(FormGroup)`
display : flex;
flex-direction: column;
align-items: flex-start;
margin-left: 30px;

@media (max-width: 300px) {
  margin-left: 0;
}
`;

export const MyFormGroup = styled(FormGroup)`
display : flex;
flex-direction: column;
align-items: flex-start;
`;

export const Phone = styled.div`
display : flex;
flex-direction:row ;
margin-left:30px;

@media (max-width: 300px) {
  margin-left: 0;
}
`;

export const Pass = styled.div`
display : flex;
flex-direction:row ;

@media (max-width: 300px) {
  flex-direction: column;
}
`;

export const Name = styled.div`
display:flex;
width:-webkit-fill-available;
`;
export const NumbersForms = styled.div`
flex-direction:row ;
display: flex;

@media (max-width: 300px) {
  flex-direction: column;
}
  
`;
export const DDD = styled.div`
flex-direction:row ;
display: flex;
margin-right: 10px;
`;
export const EmailFormControl = styled(FormControl)`
display: flex;
width: -webkit-fill-available;
`;
export const PhoneFormControl = styled(FormControl)`
display: flex;
width: -webkit-fill-available;

`;
export const DDDFormControl = styled(FormControl)`
display: flex;
width: -webkit-fill-available;
font-size: 15px;
flex-direction: row;
`;

export const Subtitle = styled.p`
  margin-top: 40px;
  display: flex;
  font-family: Roboto;
  font-size: 40px;
  font-weight: 500;
`;

export const Register = styled.div`
  
`;
export const Buttons = styled.div`
display: flex;
align-items: center;
flex-direction: column;
  
`;
export const FormRegister = styled(Form)`

`;

export const Submit = styled.button`
    margin-top: 30px;
    height: 40px;
    width: 150px;
    font-family: Roboto;
    font-size: 20px;
    font-weight: 500;
    background-color: ${({ theme }) => theme.colors.mediumGreen};
    color: white;
    border: 0;
    border-radius: 5px;
    cursor: pointer;
`;

export const ButtonLogin = styled.button`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
outline: none;
border:0;
background-color: ${({ theme }) => theme.colors.background};
cursor: pointer;
`;
