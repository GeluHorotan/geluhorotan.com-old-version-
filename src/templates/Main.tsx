import type { ReactNode } from 'react';

import AlertWrapper from '@/components/AlertWrapper';
import Navigation from '@/components/Navigation';
import Reminder from '@/components/Reminder';
import { useAuth } from '@/context/hooks/useAuth';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = ({ children, meta }: IMainProps) => {
  const { user } = useAuth();
  return (
    <>
      {meta}
      {!user?.isEmailVerified && user && (
        <Reminder>
          Your account is not yet verified. Please check your email for a
          verification link and complete the process to fully access your
          account features.
        </Reminder>
      )}
      <Navigation />
      {children}
      <AlertWrapper />
    </>
  );
};

export { Main };
