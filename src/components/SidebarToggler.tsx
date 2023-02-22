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
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const SidebarToggler: FC<SidebarTogglerProps> = ({
  toggle,
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

  const pathClassNames =
    isOpen && isDarkMode
      ? 'stroke-secondary'
      : !isOpen && !isDarkMode
      ? 'stroke-secondary'
      : 'stroke-primary';

  return (
    <button
      onClick={toggle}
      className={`
    pointer-events-auto fixed inset-4 z-50 h-12 w-12 cursor-pointer select-none rounded-full border-none bg-transparent outline-none
  `}
    >
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
          className={`${pathClassNames} transition-colors duration-700`}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
          className={`${pathClassNames} transition-colors duration-700`}
        />
        <Path
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
          className={`${pathClassNames} transition-colors duration-700`}
        />
      </svg>
    </button>
  );
};

export default SidebarToggler;
