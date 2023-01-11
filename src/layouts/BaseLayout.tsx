import React from 'react';

import AlertWrapper from '@/components/AlertWrapper';
import Navigation from '@/components/Navigation';

type Props = {
  children: React.ReactNode;
};

const BaseLayout = ({ children }: Props) => {
  return (
    <>
      <Navigation />

      <main>{children}</main>
      <AlertWrapper />
    </>
  );
};

export default BaseLayout;
