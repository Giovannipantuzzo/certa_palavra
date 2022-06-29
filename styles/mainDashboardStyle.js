import styled from 'styled-components';

export const ContainerCardsRedaction = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 15px 15px;
`;

export const DivisionCardsRedaction = styled.div`
  width: 100%;
  height: 100%;
`;

export const TitleCardsRedactionPage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TitleCardsRedactionPageH1 = styled.h1`
  font: normal 18pt Roboto;
  margin-bottom: 0.8%;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 30px;
`;

export const LineTableCardsRedaction = styled.div`
  width: 100%;
  border: 2px solid;
  margin-bottom: 2%;
  color: ${({ theme }) => theme.colors.primary};
`;

export const LoaderCardsRedaction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const BodyRedactionCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 1.5%;
  box-shadow: 0 8px 3px 0 rgba(0, 0, 0, 0.2), 0 6px 15px 0 rgba(0, 0, 0, 0.19);
  border-radius: 8px;
`;

export const CardRedaction = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  background-color: white;
  border-radius: 4px;
`;

export const TitleCardRedaction = styled.button`
  background-color: transparent;
  text-align: center;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: none;
  cursor: pointer;
`;

export const TitleCardRedactionP = styled.p`
  font-size: large;
  font-weight: 200;
  margin-right: 40%;
  align-items: center;
  display: flex;
  color: black;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  text-align: initial;
  word-break: break-all;
`;

export const DescriptionCardRedactions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  border-radius: 8px;
  background-color: white;
  padding: 10px;
`;

export const DescriptionCardRedactionsP = styled.p`
  margin-top: 10px;
  font-size: 17px;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 10px;
  word-break: break-all;
  flex-wrap: wrap;
`;


