import styled from 'styled-components';

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