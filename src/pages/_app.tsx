import { QueryClientProvider, QueryClient } from 'react-query';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';

import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '../styles/theme';
import { TagsContextProvider } from '../context/useTags';
import { NavProvider } from '../context/useNav';
import { GalleryProvider } from '../context/useGallery';
import { LoadingScreen } from '../components/Screens/LoadingScreen';
import { Nav } from '../components/NavBar/Nav';
import { Header } from '../components/Header/Header';

import type { AppProps } from 'next/app';

const queryClient = new QueryClient();

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
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
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <LoadingScreen isLoading={isLoading} />
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
      </QueryClientProvider>
    </ChakraProvider>
  );
}
