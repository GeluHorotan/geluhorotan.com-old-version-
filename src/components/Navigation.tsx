import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi';

import { useAuth } from '@/context/hooks/useAuth';
import type { Theme } from '@/customHooks/useDarkMode';
import useMediaQuery from '@/customHooks/useMediaQuery';

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
  const { isAuthenticated, user, logout } = useAuth();
  const isMobile = useMediaQuery('(max-width: 1012px)');

  const navItems = [
    { id: 2, name: 'about' },
    { id: 3, name: 'projects' },
    { id: 4, name: 'contact' },
  ];

  const dropdownData = {
    header: 'Signed in as',
    items: [
      {
        name: 'Profile',
        to: '/dashboard',
        id: 1,
      },
      {
        name: 'Settings',
        to: '/about',
        id: 2,
      },

      {
        name: 'Report a bug',
        to: '/about',
        id: 3,
      },

      {
        name: 'Log out',

        isNew: true,
        id: 4,
        action: logout,
      },
    ],
  };

  return (
    <>
      {!isMobile && (
        <nav
          className={
            ' fixed flex  w-full flex-row items-center justify-between   bg-secondary py-3 px-14 dark:bg-primary  '
          }
        >
          <ul className="flex w-1/2 flex-row items-center justify-start gap-12  ">
            <Link href="/">
              <Logo size={36} />
            </Link>
            <div className="flex items-center justify-center gap-8">
              {navItems?.map((item) => {
                return (
                  <li key={item.id} className="navigation-item">
                    <Link href={`/${item.name === 'home' ? '' : item.name}`}>
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </div>
          </ul>
          <ul className="flex items-center  justify-between gap-6 ">
            {!isAuthenticated ? (
              <li className="navigation-item ">
                {' '}
                <Link href="/signin">SIGN IN</Link>
              </li>
            ) : (
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
            )}
            <DarkMode theme={theme} setTheme={setTheme} />
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
