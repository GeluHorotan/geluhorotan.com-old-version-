import Image from 'next/image';
import type { FC } from 'react';
import React from 'react';

type Props = {
  noText?: string;
};

const TechStack: FC<Props> = ({ noText }) => {
  return (
    <div className="flex flex-wrap items-center justify-start gap-6 max-md:justify-center ">
      <div className="flex items-center justify-center gap-2">
        <div className="relative flex h-8  w-8  ">
          <Image
            src={`https://img.icons8.com/?size=512&id=123603&format=png`}
            fill={true}
            alt={'React'}
            className="inset-0  object-cover drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)] dark:drop-shadow-none "
          />
        </div>
        {!noText && <p className="uppercase tracking-widest ">React</p>}
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="relative flex h-8  w-8  ">
          <Image
            src={`https://img.icons8.com/?size=512&id=jD-fJzVguBmw&format=png`}
            fill={true}
            alt={'Redux'}
            className="inset-0  object-cover drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)] dark:drop-shadow-none "
          />
        </div>
        {!noText && <p className="uppercase tracking-widest ">Redux</p>}
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="relative flex h-8  w-8  ">
          <Image
            src={`https://img.icons8.com/?size=512&id=Xf1sHBmY73hA&format=png`}
            fill={true}
            alt={'Typescript'}
            className="inset-0  object-cover drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)] dark:drop-shadow-none "
          />
        </div>
        {!noText && <p className="uppercase tracking-widest ">Typescript</p>}
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="relative flex h-8  w-8  ">
          <Image
            src={`https://img.icons8.com/?size=512&id=4PiNHtUJVbLs&format=png`}
            fill={true}
            alt={'Tailwind CSS'}
            className="inset-0  object-cover drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)] dark:drop-shadow-none "
          />
        </div>
        {!noText && <p className="uppercase tracking-widest ">Tailwind CSS</p>}
      </div>
    </div>
  );
};

export default TechStack;
