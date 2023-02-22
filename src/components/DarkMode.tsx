import { motion } from 'framer-motion';
import type { FC } from 'react';
import { HiOutlineLightBulb, HiOutlineMoon } from 'react-icons/hi';

import type { Theme } from '@/customHooks/useDarkMode';
import useMount from '@/customHooks/useMount';

interface DarkModeProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const DarkMode: FC<DarkModeProps> = ({ theme, setTheme }) => {
  const [isMounted] = useMount();

  if (isMounted) {
    return (
      <div className="flex items-center gap-4">
        <HiOutlineLightBulb
          className="text-primary dark:text-secondary"
          size={24}
        />
        <div
          className={`flex h-6 w-12 cursor-pointer  items-center rounded-full bg-secondary_s_2 p-1 ${
            theme === 'light' ? 'justify-start' : 'justify-end'
          }`}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <motion.span
            layout
            transition={{
              type: 'spring',
              stiffness: 700,
              damping: 30,
            }}
            className="h-4 w-4 rounded-full bg-secondary_t_2 "
          />
        </div>
        <HiOutlineMoon className="text-primary dark:text-secondary" size={24} />
      </div>
    );
  }
  return null;
};

export default DarkMode;
