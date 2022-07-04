import styled from 'styled-components';

export const SearchContainerModal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 50%;
    width: 62vh;
    border-radius: 3px;
    background-color: white;
    border: 0.5px solid ${({ theme }) => theme.colors.primary};
    box-shadow: 24;
    padding: 3%;
    @media (max-width: 500px) {
        width: 85%;
    }
`;

export const SearchText = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width: 100%;
    text-decoration: underline ${({ theme }) => theme.colors.primary};
`;

export const SearchAdvancedTitle = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction: row;
    width:100%;
    font-weight: normal;
    font-size: 25px;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1%;
`;

export const SearchAdvancedContent = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    width: 100%;
    flex-direction: column;
`;

export const SearchAdvancedButtonsAlign = styled.div`
    display: flex;
    flex-direction: row;
    margin: 5%;
`;

export const SearchAdvancedButtonSubmit = styled.button`
    display:flex;
    height: 6vh;
    width: 16vh;
    font-size: 15px;
    font-weight: 500;
    border: solid black;
    border-width: 1px;
    border-radius: 3px;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    margin-bottom: 3%;
    margin-right: 3%;
    background-color: ${({ theme }) => theme.colors.green};
    color: white;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;

export const SearchAdvancedButtonAlignP = styled.p`
    color: white;
`;
