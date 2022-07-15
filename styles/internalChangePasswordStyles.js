import styled from 'styled-components';

export const ContainerInternalChangePassword = styled.div`
  height: calc(100vh - 75px);
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 12pt;
  margin-left: 4%;
  @media (max-width: 700px) {
    margin-left: 0;
  }
`;

export const BoxInternalChangePassword = styled.div`
  width: 80%;
  height: 60%;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: start;
  border-radius: 12px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  background-color: #F8F8F8;
  padding: 4%;
  text-align: justify;
  @media (max-width: 700px) {
      flex-direction: column;
      width: 90%;
  }
`;

export const InternalChangePasswordTextH1 = styled.h1`
  font-size: 2em;
  margin-bottom: 8%;
  font-weight: 100;
  color: black;
  text-decoration: underline;
  @media (max-width: 500px) {
    font-size: 1.6em;
  }
`;

export const InternalChangePasswordTextP = styled.p`
  font-size: 1.2em;
  margin: 0;
  font-weight: 100;
  color: black;
  @media (max-width: 500px) {
    font-size: 1em;
    margin-top: 5%;
  }
`;

export const InternalChangePasswordButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 3%;
  margin-right: 20%;
  cursor: pointer;
`;

export const InternalChangePasswordButton = styled.button`
  display: flex;
  justify-content: center;
  padding: 2% 5%;
  margin-top: 5%;
  min-width: 100px;
  min-height: 50px;
  border-radius: 0.5vw;
  border: 1px solid;
  background-color: ${({ theme }) => theme.colors.green};
  color: white;
  font-size: 1.2em;
  @media (max-width: 500px) {
    padding: 5% 5%;
    margin-top: 8%;
  }
  @media (max-width: 400px) {
    padding: 5% 5%;
    margin-top: 8%;
    width: 80%;
  }
`;

export const PopUpInternalChangePassword = styled.div`
  width: 45%;
  height: 30%;
  padding: 2%;
  background-color: white;
  color: black;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  font-size: 12pt;
`;

export const PopUpInternalChangePasswordH1 = styled.div`
  font-size: 1.7em;
  margin-bottom: 10px;
  font-weight: 400;
`;

export const PopUpInternalChangePasswordP = styled.div`
  font-size: 1em;
`;

export const GroupButtonsInternalChangePassword = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const SendButtonInternalChangePassword = styled.button`
  padding: 2% 5%;
  margin-top: 4%;
  min-width: 100px;
  min-height: 50px;
  border-radius: 0.5vw;
  border: 1px solid;
  border-color: black;
  background-color: ${({ theme }) => theme.colors.green};
  color: white;
  font-size: 1.2em;
`;

export const CancelButtonInternalChangePassword = styled.button`
  padding: 2% 5%;
  margin-top: 4%;
  margin-right: 2%;
  min-width: 100px;
  min-height: 50px;
  border-radius: 0.5vw;
  border: 1px solid;
  border-color: black;
  background-color: ${({ theme }) => theme.colors.green};
  color: white;
  font-size: 1.2em;
`;


