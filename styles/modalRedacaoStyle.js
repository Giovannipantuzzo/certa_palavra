import styled from 'styled-components';

export const SendRedactionButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background: transparent;
  border-radius: 6px;
  border: 2px solid transparent;
  margin-bottom: 10px;
  height: auto;
  padding: 5px;
  cursor: pointer;
`;

export const SendRedactionButtonP = styled.p`
  font-size: 1em;
`;

export const MeanDashboard = styled.div`
    padding: 75px 30px;
    width: 100%;
    @media (max-width: 700px) {
      padding: 35px 0;
    }
`;