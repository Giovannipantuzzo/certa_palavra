import styled from 'styled-components';

export const PerfilTitle = styled.h1`
  display: flex;
  width: 90%;
  align-items: center;
  justify-content: flex-start;
  font-size: 2rem;
  margin-top: 3%;
  margin-bottom: 6%;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
  font-weight: 400;
  @media (max-width: 380px) {
    font-size: 1.4rem;
  }
`;

export const PerfilImage = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width: 50%;
    height: 50%;
    @media (max-width: 700px) {
      width:30%;
    }
    @media (max-width: 400px) {
      width:40%;
    }
`;

export const RowEdit = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  letter-spacing: 30%;
`;

export const Icon = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
`;

export const AddressData = styled.p`
  width: 90%;
  border-radius: 3px;
  padding: 1%;
  padding-left: 1.8%;
  font-size: 1.1rem;
  color: black;
  @media (max-width: 380px) {
    font-size: 0.8rem;
  }
`;

export const ContainerDatas = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-top: 2%;
  padding-bottom: 5%;
  @media (max-width: 560px) {
    flex-direction: column;
  }
`;

export const InsidePaper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.colors.green};
  padding: 1.5%;
  @media (max-width: 650px) {
    width: 80%;
  }
`;
