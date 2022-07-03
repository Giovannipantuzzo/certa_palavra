import styled from 'styled-components';

export const LinearProgressContainer = styled.div`
width: 80%;

@media (max-width: 300px) {
  margin-left: 0;
}
`;

export const ColorSelectedText = styled.div`
    padding: 5px;

@media (max-width: 300px) {
  margin-left: 0;
}
`;

export const ColorPickerContainer = styled.div`
    display: flex;
    align-items: flex-end;

@media (max-width: 300px) {
  margin-left: 0;
}
`;

export const ButtonsMenuContainer = styled.div`
    display: flex;
    width: 80%;
    justify-content: space-between;
    align-items: flex-end;

@media (max-width: 300px) {
  margin-left: 0;
}
`;

export const Submit = styled.button`
    margin-top: 30px;
    height: 30px;
    width: 150px;
    font-family: Roboto;
    font-size: 18px;
    font-weight: 500;
    background-color: ${({ theme }) => theme.colors.lightGreen};
    color: white;
    border: 0;
    border-radius: 5px;
    cursor: pointer;
`;