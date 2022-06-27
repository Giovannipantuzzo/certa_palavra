import styled from 'styled-components';

export const MeanHomeContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 10%;
    min-height: calc(100vh - 221px);
    @media (max-width: 700px) {
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
    @media (max-width: 700px) {
      padding: 35px 0;
    }
`;