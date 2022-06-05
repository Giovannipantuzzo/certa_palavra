import styled from 'styled-components';

export const ImageBox = styled.div`
display:flex;
align-items:center;
justify-content:center;
width:20%;
cursor:pointer;
`;

export const TextBox = styled.div`
    display:flex;
    align-items:center;
    justify-content: space-around;
    height: 100%;
    width: 55%;
    border-radius: 5px;
`;

export const LocationContainer = styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
  height:45%;
  width: 30%;
  border-radius: 5px;
  border: 0px;
  background: #FFF1F1;
  padding-left:0.5%;  
`;

export const Location = styled.div`
  display:flex;
  align-items: center;
  height: 90%;
  width: 90%;
  margin-left:1%;
  border-radius: 5px;
  border: 0px;
  background: #FFF1F1;
  outline:none;
`;

TextBox.SearchContainer = styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
  width: 60%;
  height:45%;
  border-radius: 5px;
  border: 0px;
  padding-left:0.5%;
  padding-right:0.5%;
  background: #FFF1F1;
`;

TextBox.Search = styled.input`
  display:flex;
  height: 90%;
  width: 90%;
  margin-left:1%;
  border-radius: 5px;
  border: 0px;
  background: #FFF1F1;
  outline:none;
`;

export const YourSpaceContainer = styled.div`
display:flex;
align-items:center;
justify-content:center;
width:10%;
height:100%;
`;

export const YourSpace = styled.button`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-around;
    width: 100%;
    height:48%;
    font-family: Roboto;
    font-size: 20px;
    font-weight: 300;
    background-color: ${({ theme }) => theme.colors.mediumGreen};
    color: white;
    border: 0;
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
border: 0;
outline: none;
background-color:${({ theme }) => theme.colors.rose} ;
`;
