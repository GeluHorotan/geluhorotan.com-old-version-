import Image from 'next/image';
import type { FC } from 'react';
import React from 'react';

type Props = {
  imgSrc: string;
  children: React.ReactNode;
  isPushed?: boolean;
};

const AboutNavCard: FC<Props> = ({ imgSrc, children, isPushed }) => {
  return (
    <div
      className={`${
        isPushed ? 'mt-4' : ''
      } cursor:pointer flex  w-full flex-col gap-4  bg-primary p-2 transition-all duration-150 ease-in-out hover:scale-105 hover:bg-accent`}
    >
      <div className="relative h-72 w-40  ">
        <Image
          src={imgSrc}
          alt="test"
          fill={true}
          className="inset-0 block h-auto w-full  object-cover object-center"
        />
      </div>
    </div>
  );
};

export default AboutNavCard;
