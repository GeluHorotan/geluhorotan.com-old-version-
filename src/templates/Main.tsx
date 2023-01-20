import type { ReactNode } from 'react';

import AlertWrapper from '@/components/AlertWrapper';
import Navigation from '@/components/Navigation';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = ({ children, meta }: IMainProps) => {
  return (
    <>
      {meta}
      <Navigation />
      {children}
      <AlertWrapper />
    </>
  );
};

export { Main };
