import { motion, useCycle } from 'framer-motion';
import Link from 'next/dist/client/link';
import type { FC, Key } from 'react';
import { useEffect, useRef, useState } from 'react';
import { AiFillGithub, AiOutlineTwitter } from 'react-icons/ai';
import { BiCopyright } from 'react-icons/bi';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { TiSocialLinkedin } from 'react-icons/ti';

import SidebarToggler from '@/components/SidebarToggler';
import type { User } from '@/context/providers/AuthProvider';
import type { Theme } from '@/customHooks/useDarkMode';
import { useDimensions } from '@/customHooks/useDimensions';
import useScrollToElement from '@/customHooks/useScrollToElement';

import DarkMode from './DarkMode';
import Dropdown from './Dropdown';
import ProfilePicture from './ProfilePicture';
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
    to: string;
  }[];
  user: User;
  isAuthenticated: boolean;
}

interface SidebarItemProps {
  name: string;
  to: string;
  toggle: () => void;
  target?: string;
}

const SidebarItem: FC<SidebarItemProps> = ({ name, to, toggle, target }) => {
  const handleContactClick = useScrollToElement();

  return (
    <motion.li
      onClick={() => toggle()}
      variants={ItemVariant}
      className="navigation-item flex w-full flex-col items-start justify-center  "
    >
      <Link
        href={to}
        onClick={(event) => handleContactClick(event, to, target, -25)}
        className=" text-xl font-medium uppercase tracking-widest text-primary dark:text-secondary"
      >
        {name}
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
  const [isScrolled, setIsScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 10; // Adjust this value to determine the scroll threshold

      if (window.pageYOffset > threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        className={` ${
          isScrolled ? ' bg-secondary py-3 dark:bg-primary ' : 'py-5'
        }  fixed inset-0 z-50 flex h-max items-center justify-between   px-20  max-md:px-4  `}
      >
        <div className="flex items-center justify-center gap-3    ">
          <SidebarToggler
            toggle={() => toggleOpen()}
            isOpen={isOpen}
            theme={theme}
            setTheme={setTheme}
            isScrolled={isScrolled}
          />

          <div
            className={`${
              isScrolled ? 'text-base' : 'text-lg'
            }  duration-250 font-medium text-accent transition-all ease-in-out dark:text-accent2`}
          >
            MENU
          </div>
        </div>
        <Link href="/">
          <Logo
            id={1}
            size={isScrolled ? 32 : 40}
            className={'duration-250  transition-all ease-in-out '}
            primaryColor="fill-accent dark:fill-accent2"
            secondaryColor="fill-accent2 dark:fill-accent"
          />
        </Link>
        <div className="flex  items-center justify-between gap-6  ">
          {!isAuthenticated ? (
            <Link href="/login" className="   text-primary dark:text-secondary">
              SIGN IN
            </Link>
          ) : (
            <Dropdown
              data={dropdownData}
              secondLabel={user?.email}
              reverseColor
            >
              <div className="flex  items-center justify-between gap-2 ">
                <ProfilePicture
                  size="small"
                  className="rounded-lg"
                  isScrolled={isScrolled}
                />
                <HiOutlineChevronRight className="rotate-90 text-accent dark:text-accent2" />
              </div>
            </Dropdown>
          )}
        </div>
      </motion.div>
      <motion.nav
        custom={height}
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        ref={containerRef}
        className={` fixed inset-0 z-40 flex  h-[4.25rem] w-full items-center  justify-between    
           `}
      >
        <motion.div
          className={`fixed bottom-0 z-40 flex h-screen   w-full items-start justify-center bg-secondary  px-20 py-40 dark:bg-primary max-md:px-4`}
          variants={sidebar}
        >
          <motion.div
            variants={SidebarVariant}
            className=" flex w-full flex-col items-start justify-center gap-8   "
          >
            <div className="flex flex-col gap-14">
              <motion.div variants={ItemVariant}>
                <DarkMode
                  theme={theme}
                  setTheme={setTheme}
                  isScrolled={isScrolled}
                />
              </motion.div>
              <div className="flex flex-col gap-4">
                {navItems.map(
                  (
                    item: {
                      to: string;
                      id: number;
                      name: string;
                      target?: string;
                    },
                    i: Key
                  ) => (
                    <SidebarItem
                      key={i}
                      name={item.name}
                      target={item.target}
                      to={item.to}
                      toggle={() => toggleOpen()}
                    />
                  )
                )}
              </div>
              <div className="my-4 flex  flex-col  gap-4">
                <ul className="flex flex-col items-start gap-2  text-primary_s_2 underline dark:text-secondary_s_2">
                  <motion.li variants={ItemVariant} className="navigation-item">
                    <Link href="privacy-policy">Privacy Policy</Link>
                  </motion.li>
                  <motion.li variants={ItemVariant} className="navigation-item">
                    <Link href="terms-and-conditions">
                      Terms and Conditions
                    </Link>
                  </motion.li>
                </ul>
              </div>
              <div className="flex items-center gap-2 text-accent dark:text-accent2">
                <Link href="https://github.com/GeluHorotan" target={'_blank'}>
                  <motion.div variants={ItemVariant}>
                    <AiFillGithub size={20} />
                  </motion.div>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/gelu-horotan/"
                  target={'_blank'}
                >
                  <motion.div variants={ItemVariant}>
                    <TiSocialLinkedin size={24} />
                  </motion.div>
                </Link>
                <Link href="https://twitter.com/oxymoron365" target={'_blank'}>
                  <motion.div variants={ItemVariant}>
                    <AiOutlineTwitter size={20} />
                  </motion.div>
                </Link>
              </div>
              <motion.div
                variants={ItemVariant}
                className="flex items-center gap-2 text-primary dark:text-secondary"
              >
                {new Date().getFullYear()}
                <BiCopyright />
                <p>All right reserved.</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.nav>
    </>
  );
};

export default Sidebar;
