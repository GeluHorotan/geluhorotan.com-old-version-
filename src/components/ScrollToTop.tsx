import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';

const ScrollToTop: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-full  bg-secondary text-primary transition-opacity duration-200 dark:bg-primary dark:text-secondary ${
        isVisible ? 'flex' : 'hidden'
      }`}
      onClick={scrollToTop}
    >
      <MdOutlineKeyboardArrowUp size={40} />
    </div>
  );
};

export default ScrollToTop;
