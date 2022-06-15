import styled from 'styled-components';

export const MenuSidepage = styled.div`
    display : flex;
    background-color: ${({ theme }) => theme.colors.lightGreen}
    @media (max-width: 850px) {
      justify-content: center;
    }
`;

export const MenuSideContainer = styled.div`
    width: max-content;
    min-width: 180px;
    padding: 1%;
    margin: 5%;
    margin-bottom: 5%;
    font-size: 15;
    border-radius: 4px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    background-color: ${({ theme }) => theme.colors.primary};
`;
