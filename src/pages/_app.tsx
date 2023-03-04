import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Header } from '../components/Header';
import { LoadingPage } from '../components/LoadingPage';
import { Nav } from '../components/Nav';
import { GalleryProvider } from '../context/useGallery';
import { NavProvider } from '../context/useNav';
import { TagsContextProvider } from '../context/useTags';
import { theme } from '../styles/theme';

import type { AppProps } from 'next/app';
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function handleRouteChangeStart() {
    setIsLoading(true);
  }

  function handleRouteChangeStop() {
    setIsLoading(false);
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
    <ChakraProvider theme={theme} portalZIndex={11}>
      <SessionProvider session={session}>
        <LoadingPage isLoading={isLoading} />
        <GalleryProvider>
          <TagsContextProvider>
            <NavProvider>
              <Nav />
              <Header />
              <Component {...pageProps} />
            </NavProvider>
          </TagsContextProvider>
        </GalleryProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}
