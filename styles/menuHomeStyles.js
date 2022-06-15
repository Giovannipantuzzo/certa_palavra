import styled from 'styled-components';

export const menuSidepage = styled.div`
    display : flex;
    @media (max-width: 850px) {
      justify-content: center;
    }
`;

export const menuSideContainer = styled.div`
    width: max-content;
    padding: 1%;
    margin: 5%;
    margin-bottom: 5%;
    font-size: 15;
    border-radius: 4px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    background-color: #F8F8F8;
`;

export const menuSideGrupButton = styled.div`
    background-color: #F8F8F8;
    :hover {
      color: var(--fontColor2);
      box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
    }
`;

export const menuSideClickButton = styled.div`
    color: var(--fontColor2);
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
`;