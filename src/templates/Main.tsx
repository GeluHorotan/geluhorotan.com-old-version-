import type { ReactNode } from 'react';

import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import useDarkMode from '@/customHooks/useDarkMode';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  test?: string;
};

const Main = ({ children, meta }: IMainProps) => {
  const [theme, setTheme] = useDarkMode();
  return (
    <>
      {meta}

      <Navigation theme={theme} setTheme={setTheme} />
      {children}
      <Footer />
    </>
  );
};

export { Main };
