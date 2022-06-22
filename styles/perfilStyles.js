import styled from 'styled-components';

export const BoxDatas = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  border-color: black;
  border-radius: 5px;
  background-color: #609694;
  line-height: 100%;
  border-style: solid;
  border-width: 1px;
  margin-top: 2%;
  margin-bottom: 2%;
  padding: 1%;
  color: white;
  justify-content: center;

  font-size: 3rem;

  @media (max-width: 1050px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  @media (max-width: 560px) {
    width: 80%;
    margin-bottom: 2%;
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
  font-size: 1.5rem;
  justify-content: center;
  color: white;
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
