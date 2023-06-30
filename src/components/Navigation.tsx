import Link from 'next/link';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi';

import { useAuth } from '@/context/hooks/useAuth';
import type { Theme } from '@/customHooks/useDarkMode';
import useMediaQuery from '@/customHooks/useMediaQuery';
import useScrollToElement from '@/customHooks/useScrollToElement';

import DarkMode from './DarkMode';
import Dropdown from './Dropdown';
import ProfilePicture from './ProfilePicture';
import Sidebar from './Sidebar';
import Logo from './svgs/Logo';

interface NavProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const Navigation: FC<NavProps> = ({ theme, setTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const isMobile = useMediaQuery('(max-width: 1012px)');
  const handleContactClick = useScrollToElement();

  const navItems = [
    { id: 0, name: 'ABOUT', to: '/about' },
    { id: 1, name: 'PROJECTS', to: '/', target: 'projects' },
    { id: 2, name: 'CV', to: '/cv' },
    {
      id: 3,
      name: 'CONTACT',
      to: '/',
      target: 'contact',
    },
  ];

  const dropdownData = {
    header: 'Signed in as',
    items: [
      {
        name: 'Log out',

        id: 4,
        action: logout,
      },
    ],
  };

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 10; // Adjust this value to determine the scroll threshold

      if (window.scrollY > threshold) {
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
      {!isMobile && (
        <nav
          className={` ${
            isScrolled ? '    bg-secondary py-3 dark:bg-primary' : 'py-5'
          }  fixed top-0 z-50 flex w-full flex-row items-center justify-between px-20 transition-all duration-150   ease-in-out  `}
        >
          <div className="flex w-1/2 flex-row items-center justify-start gap-12  ">
            <Link href="/" className="flex items-center gap-4">
              <Logo
                id={0}
                size={isScrolled ? 32 : 40}
                className={'duration-250  transition-all ease-in-out '}
                primaryColor="fill-accent dark:fill-accent2"
                secondaryColor="fill-accent2 dark:fill-accent"
              />
            </Link>

            <ul className="flex items-center justify-center gap-8">
              {navItems?.map((item) => {
                return (
                  <li key={item.id} className="navigation-item ">
                    <Link
                      href={item.to}
                      onClick={(event) =>
                        handleContactClick(event, item.to, item.target, -25)
                      }
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <ul className="flex items-center  justify-between gap-6 ">
            {!isAuthenticated ? (
              <li className="navigation-item ">
                {' '}
                <Link href="/login">SIGN IN</Link>
              </li>
            ) : (
              <li>
                <Dropdown data={dropdownData} secondLabel={user?.email}>
                  <div className="flex  items-center justify-between gap-6 ">
                    <div className="flex  items-center justify-between gap-3 ">
                      <ProfilePicture size="small" />
                      <span className="text-primary dark:text-secondary">
                        {user?.firstName}&nbsp;{user?.lastName}
                      </span>
                    </div>
                    <HiOutlineChevronRight className="rotate-90 text-primary dark:text-secondary"></HiOutlineChevronRight>
                  </div>
                </Dropdown>
              </li>
            )}
            <li>
              <DarkMode theme={theme} setTheme={setTheme} />
            </li>
          </ul>
        </nav>
      )}

      {isMobile && (
        <Sidebar
          theme={theme}
          setTheme={setTheme}
          dropdownData={dropdownData}
          navItems={navItems}
          user={user}
          isAuthenticated={isAuthenticated}
        />
      )}
    </>
  );
};

export default Navigation;
