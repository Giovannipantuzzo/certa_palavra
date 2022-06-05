import '../styles/globals.css'
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from '../src/contexts/AuthContext';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

const theme = {
  colors: {
    primary: '#0070f3',
    rose: '#F6C8CA',
    lightGreen: '#A6DAD8',
    mediumGreen: '#609694',
    darkGreen: '#426A69',
    mediumRed: '#AA4545',
    darkRed: '#9C1D1D',
    strongRed: '#BD2B2B',
    baseGray: '#AAABB0',
    mediumGray: '#C4C4C4',
    titleGray: '#E8E8E8',
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
