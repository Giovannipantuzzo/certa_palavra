import styled from 'styled-components';

export const MeanHomeContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 10%;
    min-height: calc(100vh - 221px);
    overflow: hidden;
    @media (max-width: 850px) {
      flex-direction: column;
    }
`;

export const SideMenuDashboard = styled.div`
  display: flex;
  justify-content: center;
  padding: 150px 0;
  @media (max-width: 700px) {
    padding 0;
  }
`;

export const MeanDashboard = styled.div`
    padding: 75px 30px;
    width: 100%;
    @media (max-width: 850px) {
      padding: 35px 0;
      padding-bottom: 60px;
    }
`;

export const UsersCounter = styled.div`
    color: ${({ theme }) => theme.colors.green};
    margin-left: 30px;
    font-size: 14pt;
    @media (max-width: 700px) {
      margin-bottom: 25px;
    }
`;

export const UsersCounterLine = styled.div`
    width: 35%;
    height: 2px;
    margin-top: 5px;
    color: ${({ theme }) => theme.colors.green};
    background-color: ${({ theme }) => theme.colors.green};
`;