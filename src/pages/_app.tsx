import '@/styles/globals.css';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';

import { RouteShield } from '@/components/RouteShield';
import { Providers } from '@/context/Providers';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <>
      <Providers>
        <RouteShield>
          <Component {...pageProps} />
        </RouteShield>
      </Providers>
    </>
  );
}

export default MyApp;
