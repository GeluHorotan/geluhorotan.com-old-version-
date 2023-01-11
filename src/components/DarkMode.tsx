import { motion } from 'framer-motion';
import { HiOutlineLightBulb, HiOutlineMoon } from 'react-icons/hi';

import useDarkMode from '@/customHooks/useDarkMode';
import useMount from '@/customHooks/useMount';

const DarkMode = () => {
  const [colorTheme, setTheme] = useDarkMode();
  const [isMounted] = useMount();

  if (isMounted)
    return (
      <div className="flex items-center gap-4">
        <HiOutlineLightBulb
          className="text-secondary dark:text-primary"
          size={24}
        />
        <div
          className={`flex h-6 w-12 cursor-pointer  items-center rounded-full bg-secondary_s_2 p-1 ${
            colorTheme === 'light' && isMounted
              ? 'justify-start'
              : colorTheme === 'dark' && isMounted
              ? 'justify-end'
              : ''
          }  `}
          onClick={() =>
            colorTheme === 'light' ? setTheme('light') : setTheme('dark')
          }
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

        <HiOutlineMoon className="text-secondary dark:text-primary" size={24} />
      </div>
    );
};

export default DarkMode;
