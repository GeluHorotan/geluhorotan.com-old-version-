import type { SVGMotionProps } from 'framer-motion';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import type { Theme } from '@/customHooks/useDarkMode';

const Path = (
  props: JSX.IntrinsicAttributes &
    SVGMotionProps<SVGPathElement> &
    React.RefAttributes<SVGPathElement>
) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    strokeLinecap="round"
    {...props}
  />
);

interface SidebarTogglerProps {
  toggle?: any;
  isOpen: boolean;
  isScrolled: boolean;
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const SidebarToggler: FC<SidebarTogglerProps> = ({
  toggle,
  isScrolled,
  isOpen,
  theme,
  setTheme,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(
    typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (theme === 'dark') {
      setIsDarkMode(false);
    } else {
      setIsDarkMode(true);
    }
  }, [theme]);

  return (
    <button
      onClick={() => toggle()}
      className={`
     flex h-max w-max cursor-pointer items-center justify-center gap-4 rounded-full border-none    outline-none
  `}
    >
      <svg
        width={`${isScrolled ? '16' : '18'}`}
        height={`${isScrolled ? '16' : '18'}`}
        viewBox="0 0 20 20"
        aria-labelledby={`togglerTitle togglerDesc`}
      >
        <title id={`togglerTitle`}>Sidebar Toggler</title>
        <desc id={`togglerDesc`}>
          Sidebar toggler that opens / closes the sidebar
        </desc>
        <Path
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
          className={`stroke-accent transition-colors duration-700 dark:stroke-accent2  `}
        />
        <Path
          d="M 2 9.423 L 13 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
          className={`stroke-accent transition-colors duration-700 dark:stroke-accent2`}
        />
        <Path
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
          className={`stroke-accent transition-colors duration-700 dark:stroke-accent2`}
        />
      </svg>
      <div
        className={`${
          isScrolled ? 'text-base' : 'text-lg'
        }  duration-250 font-medium text-accent transition-all ease-in-out dark:text-accent2`}
      >
        MENU
      </div>
    </button>
  );
};

export default SidebarToggler;
