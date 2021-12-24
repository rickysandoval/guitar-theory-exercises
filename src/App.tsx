import './App.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Main from './main/Main';

const theme = extendTheme({
  colors: {
    brand: {
      100: '#F2F6F8',
      200: '#AFC9D5',
      300: '#5F93AB',
      400: '#4D7D93',
      500: '#3F6678',
      600: '#31505E',
      700: '#152228',
      800: '#152228',
      900: '#070B0D',
    },
  },
});


function App() {
  return (
    <ChakraProvider theme={theme}>
        <Main />
    </ChakraProvider>
  );
}

export default App;
