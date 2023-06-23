import type { FC } from 'react';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Showcase: FC<Props> = ({ children }) => {
  return (
    <div className="grid w-full grid-cols-3 items-center  justify-center gap-20   max-[1400px]:w-full max-[1000px]:grid-cols-1  ">
      {children}
    </div>
  );
};

export default Showcase;
