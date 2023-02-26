import '../styles/nprogress.css';

import { ChakraProvider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { useEffect } from 'react';

import { theme } from '../styles/theme';

import type { AppProps } from 'next/app';
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  NProgress.configure({
    showSpinner: false,
    barSelector: '[role="bar"]',
  });

  function handleRouteChangeStart() {
    NProgress.start();
  }

  function handleRouteChangeStop() {
    NProgress.done();
  }

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeStop);
    router.events.on('routeChangeError', handleRouteChangeStop);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeStop);
      router.events.off('routeChangeError', handleRouteChangeStop);
    };
  }, [router]);
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
