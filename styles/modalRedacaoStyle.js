import styled from 'styled-components';
import {
  Form, FormGroup,
} from 'react-bootstrap';

export const DivContainerModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const ContainerModal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 62vh;
    max-height: 85vh;
    overflow-y: scroll;
    border-radius: 3px;
    background-color: white;
    border: 0.5px solid ${({ theme }) => theme.colors.primary};
    box-shadow: 24;
    padding: 3%;
    @media (max-width: 500px) {
      width: 90%;
    }
`;

export const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (max-width: 500px) {
      width: 90%;
    }
`;

export const ExitModal = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

export const CloseModal = styled.button`
  height: 30px;
  background-color: transparent;
  border: none;
`;

export const SendRedactionButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background: transparent;
  color: ${({ theme }) => theme.colors.green};
  border-radius: 6px;
  border: 2px solid transparent;
  height: auto;
  padding: 5px;
  cursor: pointer;
  margin: 0;
  margin-top: 19px;
`;

export const MyFormGroup = styled(FormGroup)`
display : flex;
flex-direction: column;
align-items: flex-start;
margin-bottom: 1%;
`;

export const ItemFormulary = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-right: 5px;
`;

export const TextBox2 = styled.input`
  width: 97.5%;
  padding: 5px;
  height: 25px;
  border-radius: 3px;
  margin-bottom: 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: #F8F8F8;
`;

export const FormRegister = styled(Form)`
  width: 100%;
`;

export const Subtitle = styled.p`
  display: flex;
  font-size: 30px;
  text-decoration: underline;
  font-weight: 500;
`;

export const SendRedactionButtonP = styled.p`
  font-size: 0.8em;
  color: ${({ theme }) => theme.colors.green};
  margin-right: 3px;
`;

export const MeanDashboard = styled.div`
    padding: 75px 30px;
    width: 100%;
    @media (max-width: 700px) {
      padding: 35px 0;
    }
`;

export const ButtonSubmitContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

export const ButtonSubmit = styled.button`
    display:flex;
    height: 40px;
    width: 40%;
    font-size: 15px;
    font-weight: 500;
    border: solid black;
    border-width: 1px;
    border-radius: 3px;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    margin-bottom: 3%;
    margin-top: 5%;
    background-color: ${({ theme }) => theme.colors.green};
    color: white;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;

export const ButtonAlignP = styled.p`
    color: white;
`;