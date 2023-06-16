// Framer Motion
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { cn } from '@/utils/cn';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const Scrolldown: FC<Props> = ({ children, className }) => {
  const [isScrolled, setIsScrolled] = useState(false);

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
    <div
      className={cn(
        `fixed bottom-4 left-1/2 flex w-full -translate-x-1/2 transform flex-col items-center justify-center gap-4 transition-all duration-150   ${
          isScrolled ? 'invisible opacity-0' : 'visible opacity-100'
        }`,
        className
      )}
    >
      <svg
        width="20px"
        height="100%"
        viewBox="0 0 247 390"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeMiterlimit: '1.5',
        }}
        className="relative z-10"
      >
        <motion.path
          initial={{ y: 0 }}
          animate={{ y: 40 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          id="wheel"
          d="M123.359,79.775l0,72.843"
          style={{
            fill: 'none',
            stroke: '#fff',
            strokeWidth: '15px',
          }}
        />
        <path
          id="mouse"
          d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z"
          style={{
            fill: 'none',
            stroke: '#fff',
            strokeWidth: '10px',
          }}
        />
      </svg>
      <p className="text-sm  tracking-wider">Scroll Down</p>
    </div>
  );
};

export default Scrolldown;
