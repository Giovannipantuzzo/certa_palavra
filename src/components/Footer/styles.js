import styled from 'styled-components';

export const FooterWrap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  justify-items: center;
  padding: 0 40px;
  height: auto;
  background-color: ${({ theme }) => theme.colors.primary};
  @media (max-width: 600px){
    padding: 0 10px;
  }
  @media (max-width: 460px){
    grid-template: 1fr 1fr;
  }
`;

export const FooterLogo = styled.div`
  width: 100px;
  height: 100px;
  grid-area: logo;
`;

export const FooterText = styled.div`
  grid-area: text;
  display: flex;
  flex-direction: column;
  width: 50%;
  font-size: 8pt;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  p {
    margin: 0;
  }
`;
