import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { AuthProvider } from '../src/contexts/AuthContext';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Head from 'next/head';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Quicksand', sans-serif;
    background-color: #F8F8F8;
  }
`;

const theme = {
  colors: {
    primary: '#004e7b',
    yellow: '#fddf4e',
    green: '#91ca6c',
    lightGreen: '#00b7a1',
    pink: '#ef476d',
    lightBlue: '##038dbe',
    background: '#F8F8F8',
    hoverBackground: 'rgba(96, 150, 148, 0.3)',
    borderBoxColor: 'rgba(0, 0, 0, 0.2)',
    grayIcons: '#AAABB0',
    blueButton: '#1C97B2',
    starYellow: '#FFC700',
  },
};



function MyApp({ Component }) {
  return (
    <>
      <Head>
        <title>Certa Palavra</title>
        <link rel="icon" href="/loginFoto.png" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Header />
          <Component />
          <Footer />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}


export default MyApp
