import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';

import useScrollToElement from '@/customHooks/useScrollToElement';

type Props = {
  scrollDuration?: number;
  target?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  title: string;
  number: number;
};

const ShowcaseEntry: FC<Props> = ({
  children,
  icon,
  title,
  number,
  target,
}) => {
  const { handleContactClick } = useScrollToElement();

  return (
    <div className=" relative  flex  h-full flex-col items-start justify-center gap-6    text-primary dark:text-secondary ">
      <div className="flex items-center justify-start gap-2  ">
        <div className="text-accent dark:text-accent2"> {icon}</div>
        <h6 className="break-words ">{title}</h6>
      </div>
      <div className="flex w-full flex-col gap-6">
        <div className="text-start line-clamp-4 ">{children}</div>
        <div className="flex w-full items-center justify-between ">
          <h3 className=" futura-heavy !font-thin text-accent dark:text-accent2">
            0{number}
          </h3>
          <Link
            href={`/about`}
            onClick={(event) => handleContactClick(event, '/about', target, 50)}
            className="rounded-xl border border-accent px-3 py-1 text-primary transition-all  duration-200 ease-in-out hover:scale-105 dark:border-accent2 dark:text-secondary"
          >
            SHOW MORE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseEntry;
