import type { ReactNode } from 'react';

import AlertWrapper from '@/components/AlertWrapper';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import Reminder from '@/components/Reminder';
import { useAuth } from '@/context/hooks/useAuth';
import useDarkMode from '@/customHooks/useDarkMode';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  test?: string;
};

const Main = ({ children, meta }: IMainProps) => {
  const { user } = useAuth();
  const [theme, setTheme] = useDarkMode();
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
      <Navigation theme={theme} setTheme={setTheme} />
      {children}
      <Footer />
    </>
  );
};

export { Main };
