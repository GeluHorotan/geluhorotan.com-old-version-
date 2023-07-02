import type { FC } from 'react';
import React from 'react';

type Props = {
  title: string;
  location: string;
  date: string;
  domain: string;
};

const EducationEntry: FC<Props> = ({ title, domain, date, location }) => {
  return (
    <div className="flex  flex-col gap-6 ">
      <div className="flex flex-col gap-2 ">
        <h3>{title}</h3>
        <div className="flex flex-col items-start gap-1   text-secondary_s_2">
          <h6>{domain}</h6>
          <div className="flex items-center ">
            <p>{location}</p>,&nbsp;<p>{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationEntry;
