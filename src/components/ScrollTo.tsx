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
      className=" w-max rounded-xl bg-accent px-4 py-2 text-secondary dark:bg-accent2 dark:text-primary"
      to="target"
      smooth={true}
      delay={100}
      duration={500}
    >
      {children}
    </Link>
  );
};

export default ScrollTo;
