import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';

type Props = {
  title: string;

  date: string;
  domain: string;
};

const EducationEntry: FC<Props> = ({ title, domain, date }) => {
  return (
    <div className="flex  flex-col gap-6 ">
      <div className="flex flex-col gap-2 ">
        <h3>{title}</h3>
        <div className="flex flex-col items-start    gap-1">
          <h6>{domain}</h6> <p>{date}</p>
        </div>
      </div>
    </div>
  );
};

export default EducationEntry;
