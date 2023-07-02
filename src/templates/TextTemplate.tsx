import type { ReactNode } from 'react';

import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import ScrollToTop from '@/components/ScrollToTop';
import useDarkMode from '@/customHooks/useDarkMode';

type ITextTemplateProps = {
  meta: ReactNode;
  children: ReactNode;
  pageTitle: string;
  headerPadding?: boolean;
  bodyPadding?: boolean;
  bottomBodyPadding?: boolean;
  width?: string;
};

const TextTemplate = ({
  children,
  meta,
  pageTitle,
  headerPadding,
  width,
  bodyPadding,
  bottomBodyPadding,
}: ITextTemplateProps) => {
  const [theme, setTheme] = useDarkMode();

  return (
    <>
      {meta}

      <Navigation theme={theme} setTheme={setTheme} />
      <ScrollToTop />
      <div className="  text-template-container flex min-h-screen w-full flex-col items-start justify-center  gap-8 text-primary dark:text-secondary ">
        <h1
          className={`futura-heavy relative    tracking-widest ${
            !headerPadding || 'px-20 max-md:px-4'
          }`}
        >
          {pageTitle}
        </h1>
        <div
          style={{ paddingBottom: bottomBodyPadding ? '5rem' : '0rem' }}
          className={`flex h-1/2  ${width || ''} flex-col  gap-20    ${
            !bodyPadding || 'px-20 max-md:px-4'
          } `}
        >
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
};

export { TextTemplate };
