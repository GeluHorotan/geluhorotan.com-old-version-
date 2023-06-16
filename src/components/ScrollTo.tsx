import type { FC } from 'react';
import React from 'react';
import * as Scroll from 'react-scroll';
import { animateScroll as scroll, Link } from 'react-scroll';

type Props = {
  children: React.ReactNode;
  delay: number;
  duration: number;
  smooth: boolean;
  to: string;
  className: string;
};

const ScrollTo: FC<Props> = ({
  delay,
  duration,
  smooth,
  to,
  className,
  children,
}) => {
  return (
    <Link
      className={` w-max cursor-pointer rounded-xl px-4 py-2  text-primary dark:text-secondary ${className}`}
      to={to}
      smooth={smooth}
      delay={delay}
      duration={duration}
    >
      {children}
    </Link>
  );
};

export default ScrollTo;
