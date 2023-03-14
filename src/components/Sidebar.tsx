import { motion, useCycle } from 'framer-motion';
import Link from 'next/dist/client/link';
import type { FC, Key } from 'react';
import { useEffect, useRef } from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi';

import SidebarToggler from '@/components/SidebarToggler';
import type { User } from '@/context/providers/AuthProvider';
import type { Theme } from '@/customHooks/useDarkMode';
import { useDimensions } from '@/customHooks/useDimensions';

import DarkMode from './DarkMode';
import Dropdown from './Dropdown';
import ProfilePicture from './ProfilePicture';
import Separator from './Separator';
import Logo from './svgs/Logo';

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

interface SidebarProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  dropdownData: {
    header: string;
    items: {
      name: string;
      to?: string;
      id: number;
      isNew?: boolean;
      action?: Function;
    }[];
  };
  navItems: {
    id: number;
    name: string;
  }[];
  user: User;
  isAuthenticated: boolean;
}

interface SidebarItemProps {
  item: {
    id: number;
    name: string;
  };
}

const SidebarItem: FC<SidebarItemProps> = ({ item }) => {
  return (
    <motion.li
      variants={ItemVariant}
      className="flex w-full flex-col items-start justify-center  "
    >
      <Link
        href={`/${item.name === 'home' ? '' : item.name}`}
        className=" text-xl font-medium uppercase tracking-widest text-primary dark:text-secondary"
      >
        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
      </Link>
    </motion.li>
  );
};

const Sidebar: FC<SidebarProps> = ({
  theme,
  setTheme,
  dropdownData,
  navItems,
  user,
  isAuthenticated,
}) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  useEffect(() => {
    const { body } = document;
    if (isOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'visible';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: {
      key: string;
      shiftKey: any;
      preventDefault: () => void;
    }) => {
      // Check if sidebar is open
      if (isOpen && containerRef.current) {
        const focusableElements = containerRef.current.querySelectorAll(
          'a, button, input, textarea, select'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const { activeElement } = document;

        // Check if focus is inside the sidebar
        if (
          activeElement &&
          activeElement !== document.body &&
          activeElement !== containerRef.current
        ) {
          if (e.key === 'Tab') {
            if (e.shiftKey && activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            } else if (!e.shiftKey && activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          } else {
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        className="fixed inset-0 z-50 flex h-16 items-center justify-between px-5 "
      >
        <div className="flex items-center gap-6">
          <SidebarToggler
            toggle={() => toggleOpen()}
            isOpen={isOpen}
            theme={theme}
            setTheme={setTheme}
          />
          <Logo size={48} />
        </div>
        <div className="flex  items-center justify-between gap-6  ">
          {!isAuthenticated ? (
            <Link
              href="/signin"
              className="   text-primary dark:text-secondary"
            >
              SIGN IN
            </Link>
          ) : (
            <Dropdown
              data={dropdownData}
              secondLabel={user?.email}
              reverseColor
            >
              <div className="flex  items-center justify-between gap-2 ">
                <ProfilePicture size="small" className="rounded-lg" />
                <HiOutlineChevronRight className="rotate-90 text-primary dark:text-secondary" />
              </div>
            </Dropdown>
          )}
          <DarkMode theme={theme} setTheme={setTheme}></DarkMode>
        </div>
      </motion.div>
      <motion.nav
        custom={height}
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        ref={containerRef}
        className={`fixed inset-0 z-40 flex h-16 w-full  items-center justify-between ${
          isOpen ? 'border-b border-primary' : ''
        }  
           `}
      >
        <motion.div
          className={`fixed bottom-0 z-40 flex h-[calc(100%-4rem)]  w-full items-start justify-center bg-secondary py-20 dark:bg-primary`}
          variants={sidebar}
        >
          <motion.ul
            variants={SidebarVariant}
            className=" flex w-full flex-col items-start justify-center  gap-4 px-8  "
          >
            {navItems.map((item: { id: number; name: string }, i: Key) => (
              <SidebarItem key={i} item={item} />
            ))}
          </motion.ul>
        </motion.div>
      </motion.nav>
    </>
  );
};

export default Sidebar;
