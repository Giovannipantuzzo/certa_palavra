import styled from 'styled-components';

export const PerfilTitle = styled.h1`
  display: flex;
  width: 90%;
  align-items: center;
  justify-content: flex-start;
  font-size: 2rem;
  margin-top: 3%;
  margin-bottom: 6%;
  text-decoration: underline;
  font-weight: 400;
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
  background-color: #F2F2F2;
  width: 90%;
  border-radius: 3px;
  padding: 1%;
  padding-left: 1.8%;
  font-size: 1.1rem;
  color: black;
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
  background-color: ${({ theme }) => theme.colors.lightGreen};
  border-radius: 5px;
  padding: 1.5%;
`;