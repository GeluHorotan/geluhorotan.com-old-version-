import type { FC } from 'react';
import React from 'react';

import ShowcaseEntry from './ShowcaseEntry';

type Props = {
  children: React.ReactNode;
};

const Showcase: FC<Props> = ({ children }) => {
  return (
    <div className="grid h-max w-full grid-cols-3 items-center justify-between gap-4 bg-red-400">
      {children}
    </div>
  );
};

export default Showcase;
