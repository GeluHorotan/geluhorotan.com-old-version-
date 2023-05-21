import type { FC } from 'react';
import React from 'react';

type Props = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  title: string;
};

const ShowcaseEntry: FC<Props> = ({ children, icon, title }) => {
  return (
    <div className="flex h-full flex-col items-start justify-center gap-4 bg-blue-400 ">
      <div className="flex items-center justify-center gap-2">
        {icon}
        <h4>{title}</h4>
      </div>
      {children}
    </div>
  );
};

export default ShowcaseEntry;
