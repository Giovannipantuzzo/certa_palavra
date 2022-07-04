import styled, { keyframes } from 'styled-components';

const IsLoading = styled.div`
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
color: ${({ theme }) => theme.colors.green};
font-size: 1.8em;
`;

const scaling = (scaleIn40, scaleIn50) => keyframes`
  0%, 100% {
    transform: scale(0.2);
  }
  40% {
    transform: scale(${scaleIn40});
  }
  50% {
    transform: scale(${scaleIn50});
  }
`;

const LoadingAnimation = styled.div`
background-color: ${({ theme }) => theme.colors.green};
height: 10px;
width: 10px;
border-radius: 50%;
margin-left: 1%;
margin-top: 17px;
animation: ${scaling('0.65', '0.65')} 2.5s ease-in-out infinite;
&:nth-child(1) {
  animation-delay: 0s;
}
&:nth-child(2) {
  animation-delay: 0.2s;
}
&:nth-child(3) {
  animation-delay: 0.4s;
}
@media(max-width:500px){
  animation: ${scaling('0.55', '0.55')} 2.5s ease-in-out infinite;
}
`;

export default function FullPageLoader() {
  return (
    <IsLoading>
      Loading
      <LoadingAnimation />
      <LoadingAnimation />
      <LoadingAnimation />
    </IsLoading>
  );
}
