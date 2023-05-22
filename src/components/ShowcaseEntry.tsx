import type { FC } from 'react';
import React from 'react';

type Props = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  title: string;
};

const ShowcaseEntry: FC<Props> = ({ children, icon, title }) => {
  return (
    <div className="  flex h-full flex-col  items-start justify-center gap-4  p-2 ">
      <div className="flex items-center justify-center gap-2 ">
        <div className="rounded-full bg-accent p-2"> {icon}</div>
        <h6>{title}</h6>
      </div>
      {children}
    </div>
  );
};

export default ShowcaseEntry;
