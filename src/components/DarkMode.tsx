import { motion } from 'framer-motion';
import type { FC } from 'react';
import { HiOutlineLightBulb, HiOutlineMoon } from 'react-icons/hi';

import type { Theme } from '@/customHooks/useDarkMode';
import useMount from '@/customHooks/useMount';

interface DarkModeProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  reverseColor?: boolean;
  isScrolled?: boolean;
}

const DarkMode: FC<DarkModeProps> = ({
  theme,
  setTheme,
  reverseColor,
  isScrolled,
}) => {
  const [isMounted] = useMount();

  if (isMounted) {
    return (
      <div className="flex items-center gap-2">
        <HiOutlineLightBulb
          className={`${
            !reverseColor
              ? 'text-primary dark:text-secondary'
              : 'text-secondary dark:text-primary'
          }`}
          size={24}
        />
        <div
          className={`relative flex h-6 w-12 cursor-pointer items-center rounded-full   ${
            theme === 'light' ? 'bg-secondary_s_2' : 'bg-accent2'
          } p-1 ${theme === 'light' ? 'justify-start' : 'justify-end'}`}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <motion.span
            layout
            transition={{
              type: 'spring',
              stiffness: 700,
              damping: 30,
            }}
            className={`z-10 h-4 w-4 rounded-full  ${
              theme === 'light' ? 'bg-secondary' : 'bg-primary'
            } `}
          />
        </div>
        <HiOutlineMoon
          className={`${
            !reverseColor
              ? 'text-primary dark:text-secondary'
              : 'text-secondary dark:text-primary'
          }  `}
          size={24}
        />
      </div>
    );
  }
  return null;
};

export default DarkMode;
