import type { FC } from 'react';
import React from 'react';

import GetTechIcon from './svgs/GetTechIcon';

type Props = {
  noText?: string;
  breakpoint?: string;
};

const TechStack: FC<Props> = ({ noText, breakpoint }) => {
  return (
    <div
      className={`flex  flex-wrap items-start justify-start gap-6 ${
        breakpoint || 'max-[840px]:justify-center'
      }`}
    >
      <div className="flex  items-center justify-center gap-2">
        <GetTechIcon name={'react'} size={32} />
        {!noText && <p className="uppercase tracking-widest ">React</p>}
      </div>
      <div className="flex items-center justify-center gap-2">
        <GetTechIcon name={'nextjs'} size={32} />
        {!noText && <p className="uppercase tracking-widest ">Next.js</p>}
      </div>
      <div className="flex items-center justify-center gap-2">
        <GetTechIcon name={'typescript'} size={32} />
        {!noText && <p className="uppercase tracking-widest ">Typescript</p>}
      </div>
      <div className="flex items-center justify-center gap-2">
        <GetTechIcon name={'redux'} size={32} />
        {!noText && <p className="uppercase tracking-widest ">Redux</p>}
      </div>
      <div className="flex items-center justify-center gap-2">
        <GetTechIcon name={'tailwindcss'} size={32} />
        {!noText && <p className="uppercase tracking-widest ">Tailwind CSS</p>}
      </div>
    </div>
  );
};

export default TechStack;
