import type { FC } from 'react';
import React from 'react';

type Props = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  title: string;
};

const ShowcaseEntry: FC<Props> = ({ children, icon, title }) => {
  return (
    <div className=" flex h-full  flex-col  items-start justify-start gap-4 rounded-xl bg-primary_s_2 p-6  ">
      <div className="flex items-center justify-start gap-2  ">
        <div className="rounded-full bg-accent p-3 text-primary_s_2">
          {' '}
          {icon}
        </div>
        <h6 className="break-words ">{title}</h6>
      </div>
      <div className="text-start ">{children}</div>
    </div>
  );
};

export default ShowcaseEntry;
