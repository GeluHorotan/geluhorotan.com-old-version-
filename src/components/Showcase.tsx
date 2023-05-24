import type { FC } from 'react';
import React from 'react';

import ShowcaseEntry from './ShowcaseEntry';

type Props = {
  children: React.ReactNode;
};

const Showcase: FC<Props> = ({ children }) => {
  return (
    <div className="grid  w-2/3 grid-cols-3  items-center justify-center gap-12 max-[1362px]:w-full   max-[960px]:grid-cols-2  max-md:grid-cols-1 ">
      {children}
    </div>
  );
};

export default Showcase;
