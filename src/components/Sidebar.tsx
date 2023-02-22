import { motion, useCycle } from 'framer-motion';
import type { FC } from 'react';
import * as React from 'react';
import { useRef } from 'react';

import SidebarToggler from '@/components/SidebarToggler';
import type { Theme } from '@/customHooks/useDarkMode';
import { useDimensions } from '@/customHooks/useDimensions';

import DarkMode from './DarkMode';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,

    transition: {
      duration: 0.5,
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(0px at 0px 0px)',

    transition: {
      duration: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const SidebarVariant = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const ItemVariant = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF', '#4400FF'];

interface SidebarItemProps {
  i: number;
}

interface SidebarProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const SidebarItem: FC<SidebarItemProps> = ({ i }) => {
  const style = { border: `2px solid ${colors[i]}` };
  return (
    <motion.li
      variants={ItemVariant}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      TEST
    </motion.li>
  );
};

const Sidebar: FC<SidebarProps> = ({ theme, setTheme }) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <>
      <motion.nav
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        ref={containerRef}
        custom={height}
        className={`fixed inset-0 z-50 w-1/2 ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }  `}
      >
        <motion.div
          className={`fixed inset-0 w-1/2  bg-secondary dark:bg-primary`}
          variants={sidebar}
        >
          <DarkMode theme={theme} setTheme={setTheme}></DarkMode>
          <motion.ul
            variants={SidebarVariant}
            className=" absolute top-28 flex w-56 flex-col gap-8  p-6"
          >
            {itemIds.map((i) => (
              <SidebarItem i={i} key={i} />
            ))}
          </motion.ul>
        </motion.div>
        <SidebarToggler
          toggle={() => toggleOpen()}
          isOpen={isOpen}
          theme={theme}
          setTheme={setTheme}
        />
      </motion.nav>
    </>
  );
};

const itemIds = [0, 1, 2, 3, 4];

export default Sidebar;
