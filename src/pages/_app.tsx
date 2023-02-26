import { ChakraProvider } from '@chakra-ui/react';

import { Header } from '../components/Header';
import { Nav } from '../components/Nav';
import { NavProvider } from '../context/useNav';
import { theme } from '../styles/theme';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <NavProvider>
        <Nav />
        <Header />
        <Component {...pageProps} />
      </NavProvider>
    </ChakraProvider>
  );
}
