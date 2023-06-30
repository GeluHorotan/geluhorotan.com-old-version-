import type { FC } from 'react';
import React from 'react';

type Props = {
  name: string;
  level: string;
};

const LanguageEntry: FC<Props> = ({ name, level }) => {
  return (
    <div className="flex  flex-col gap-6 ">
      <div className="flex flex-col ">
        <p>{name}</p>
        <p className="tracking-wider">Level: {level}</p>
      </div>
    </div>
  );
};

export default LanguageEntry;
