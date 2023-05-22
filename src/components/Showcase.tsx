import type { FC } from 'react';
import React from 'react';

import ShowcaseEntry from './ShowcaseEntry';

type Props = {
  children: React.ReactNode;
};

const Showcase: FC<Props> = ({ children }) => {
  return (
    <div className="grid h-max w-1/2 grid-cols-3 items-center justify-between gap-4 self-start ">
      {children}
    </div>
  );
};

export default Showcase;
