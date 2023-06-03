import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';

type Props = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  title: string;
  number: number;
};

const ShowcaseEntry: FC<Props> = ({ children, icon, title, number }) => {
  return (
    <div className=" relative z-20 flex  h-full flex-col items-start justify-center gap-6   p-4 text-secondary ">
      <div className="flex items-center justify-start gap-2  ">
        <div className="text-accent2"> {icon}</div>
        <h6 className="break-words ">{title}</h6>
      </div>
      <div className="flex w-full flex-col gap-6">
        <div className="text-start line-clamp-4 ">{children}</div>
        <div className="flex w-full items-center justify-between ">
          <h3 className=" futura-heavy !font-thin text-accent2">0{number}</h3>
          <Link
            href="#"
            className="rounded-xl bg-accent2 px-3 py-1 text-primary"
          >
            READ MORE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseEntry;
