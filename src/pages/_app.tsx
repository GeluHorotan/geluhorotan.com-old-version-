import '@/styles/globals.css';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';

import { RouteShield } from '@/components/RouteShield';
import { Providers } from '@/context/Providers';
import BaseLayout from '@/layouts/BaseLayout';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Providers>
        <RouteShield>
          <BaseLayout>{getLayout(<Component {...pageProps} />)}</BaseLayout>
        </RouteShield>
      </Providers>
    </>
  );
}

export default MyApp;
