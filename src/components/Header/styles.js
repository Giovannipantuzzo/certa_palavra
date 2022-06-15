import styled from 'styled-components';

export const ImageBox = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:20%;
    height: 80%;
    cursor:pointer;
    @media (max-width: 700px) {
      width:30%;
    }
    @media (max-width: 400px) {
      width:40%;
    }
`;

export const TextBox = styled.div`
    display:flex;
    align-items:center;
    justify-content: space-around;
    height: 100%;
    width: 55%;
    border-radius: 5px;
`;

export const YourSpaceContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-around;
    width:15%;
    height:100%;
`;

export const YourSpace = styled.button`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-around;
    width: 100%;
    min-width: 40px;
    height:48%;
    font-family: Roboto;
    font-size: 20px;
    font-weight: 300;
    background-color:${({ theme }) => theme.colors.lightGreen};
    color: white;
    border-color: ${({ theme }) => theme.colors.primary};
    border-size: 10px;
    border-radius: 5px;
    cursor:pointer;
`;

YourSpace.Word = styled.p`
    display:flex;
    align-items:center;
    justify-content:center;
    font-size: 70%;
    margin: 0;
`;

export const ItemBottomHeader = styled.p`
    display:flex;
    align-items:center;
    justify-content:center;
    font-family: Poiret One;
    font-size: 100%;
    color: white;
    cursor: pointer;
    margin: 0;
`;
export const LogOut = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15%;
    border: 0;
    outline: none;
    background-color:${({ theme }) => theme.colors.lightGreen};
    @media (max-width: 400px) {
      width: 25%;
    }
`;
