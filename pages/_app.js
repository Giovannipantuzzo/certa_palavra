import '../globals.css'
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from '../src/contexts/AuthContext';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

const theme = {
  colors: {
    primary: '#004e7b',
    yellow: '#fddf4e',
    green: '#91ca6c',
    lightGreen: '##00b7a1',
    pink: '##ef476d',
    lightBlue: '##038dbe',
    background: '#F8F8F8',
    hoverBackground: 'rgba(96, 150, 148, 0.3)',
    borderBoxColor: 'rgba(0, 0, 0, 0.2)',
    grayIcons: '#AAABB0',
    blueButton: '#1C97B2',
    starYellow: '#FFC700',
  },
};



function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp
