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
    min-width: 20%;
    max-width: 35%;
    height:100%;
    margin-right: 5%;
`;

export const YourSpace = styled.button`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-around;
    min-width: 40px;
    font-size: 20px;
    font-weight: 300;
    background-color:${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    cursor:pointer;
`;

export const YourSpaceName = styled.p`
    display:flex;
    align-items:center;
    justify-content:center;
    font-size: 70%;
    margin-left: 8px!important;
    margin: 0;
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
    background-color:${({ theme }) => theme.colors.primary};
    @media (max-width: 400px) {
      width: 25%;
    }
`;
