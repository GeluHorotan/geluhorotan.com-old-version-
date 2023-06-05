import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';

type Props = {
  scrollDuration?: number;
  scrollToId?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  title: string;
  number: number;
};

const ShowcaseEntry: FC<Props> = ({
  children,
  scrollDuration,
  icon,
  title,
  number,
  scrollToId,
}) => {
  return (
    <div className=" relative z-20 flex  h-full flex-col items-start justify-center gap-6   p-4 text-primary dark:text-secondary ">
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
            href={`/about?scrollTo=${scrollToId}&scrollDuration=${scrollDuration}`}
            className="rounded-xl bg-accent px-3 py-1 text-secondary dark:bg-accent2 dark:text-primary"
          >
            READ MORE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseEntry;
