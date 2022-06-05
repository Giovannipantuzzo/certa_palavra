import styled from 'styled-components';

export const FooterWrap = styled.div`
  display: grid;
  grid-template:
  "logo text cpe" 100px
  / 100px auto 100px;
  align-items: center;
  justify-items: center;
  padding: 0 40px;
  height: auto;
  background-color: ${({ theme }) => theme.colors.mediumGreen};
  @media (max-width: 600px){
    padding: 0 10px;
  }
  @media (max-width: 460px){
    grid-template:
    "logo cpe" 100px
    "text text" auto
    / 1fr 1fr;
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
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  p {
    margin: 0;
  }
`;

export const FooterCPE = styled.div`
  grid-area: cpe;
  display: flex;
  flex-direction: column;
  width: 100px;
  color: white;
  text-align: center;
`;
