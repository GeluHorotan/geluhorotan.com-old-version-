import '@/styles/globals.css';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';

import AlertWrapper from '@/components/AlertWrapper';
import { RouteShield } from '@/components/RouteShield';
import { Providers } from '@/context/Providers';
import useDarkMode from '@/customHooks/useDarkMode';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [theme, setTheme] = useDarkMode();

  return (
    <>
      <Providers>
        <RouteShield>
          <Component {...pageProps} test={'test'} setTheme={setTheme} />
          <AlertWrapper />
        </RouteShield>
      </Providers>
    </>
  );
}

export default MyApp;
