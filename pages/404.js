import React from 'react';
import styled from 'styled-components';

const IsntFound = styled.div`
height: 100vh;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
@media (max-width: 600px) {
    flex-direction:column;
  }
@media (max-width: 200px) {
    margin-top: 10%;
    margin-bottom: 10%;
  }
`;

const Animation = styled.div`
@media (max-width: 600px) {
  width: 60%;
  }
`;

const Title = styled.div`
color: black;
font-weight: 600;
font-size: 3em;
margin-bottom: 5%;
@media (max-width: 800px) {
    font-size: 2em;
  }
@media (max-width: 600px) {
    font-size: 2em;
  }
`;

const Text = styled.div`
flex-direction: column;
justify-content: center;
margin-right:3%;
@media (max-width: 600px) {
    margin-left: 3%;
  }
`;

const Content = styled.div`
margin-bottom:2%;
color: black;
font-weight: 300;
font-size: 1.5em;
@media(max-width: 800px) {
    font-soze:1.2em;
  }
@media (max-width: 600px) {
    font-size: 1.2em;
  }

`;

export default function NonExistingPage() {
  return (
    <IsntFound>
      <Animation>
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
        <lottie-player src="https://assets6.lottiefiles.com/private_files/lf30_uqcbmc4h.json" speed="1" autoplay background="transparent" />
      </Animation>
      <Text>
        <Title>Pagina não encontrada</Title>
        <Content>Não foi possível encontrar a página que você está procurando, isso ocorre porque:</Content>
        <Content>- Há um erro no URL em seu navegador da web. Verifique o URL e tente novamente.</Content>
        <Content>- A página que você está procurando foi movida ou excluída.</Content>
      </Text>
    </IsntFound>
  );
}
