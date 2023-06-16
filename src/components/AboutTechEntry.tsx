import Image from 'next/image';
import type { FC } from 'react';
import React from 'react';

type Props = {
  techName?: string;
};

const AboutTechEntry: FC<Props> = ({ techName }) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="relative flex h-8  w-8  ">
        <Image
          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${techName}/${techName}-original.svg`}
          fill={true}
          alt={techName}
          className="inset-0  object-cover "
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${techName}/${techName}-plain.svg`;
          }}
        />
      </div>
      <p className="uppercase ">
        {techName === 'react' ? 'react / nextjs' : techName}
      </p>
    </div>
  );
};

export default AboutTechEntry;
