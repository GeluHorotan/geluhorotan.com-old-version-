import { motion, useCycle } from 'framer-motion';
import type { FC } from 'react';
import * as React from 'react';
import { useRef } from 'react';

import SidebarToggler from '@/components/SidebarToggler';
import { useDimensions } from '@/customHooks/useDimensions';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,

    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(0px at 0px 0px)',

    transition: {
      delay: 0.5,
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

const Sidebar = () => {
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
        className={`fixed inset-0 w-full ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }  `}
      >
        <motion.div
          className={`fixed inset-0 w-full  bg-red-400`}
          variants={sidebar}
        >
          <motion.ul
            variants={SidebarVariant}
            className=" absolute top-28 w-56 p-6"
          >
            {itemIds.map((i) => (
              <SidebarItem i={i} key={i} />
            ))}
          </motion.ul>
        </motion.div>
        <SidebarToggler toggle={() => toggleOpen()} />
      </motion.nav>
    </>
  );
};

const itemIds = [0, 1, 2, 3, 4];

export default Sidebar;
