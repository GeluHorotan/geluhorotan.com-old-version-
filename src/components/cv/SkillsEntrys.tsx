import type { FC } from 'react';
import React from 'react';

type Props = {
  softSkills: string[];
  hardSkills: string[];
};

const SkillsEntry: FC<Props> = ({ softSkills, hardSkills }) => {
  return (
    <div className="flex  flex-col gap-6 ">
      <div className="flex flex-col gap-2">
        <div className="flex items-center  gap-20 max-md:flex-col max-md:items-start max-md:gap-8 ">
          <div className="flex flex-col gap-1">
            {softSkills?.map((skill, i) => {
              return <div key={i}>{skill}</div>;
            })}
          </div>
          <div className="flex flex-col gap-1">
            {hardSkills?.map((skill, i) => {
              return <div key={i}>{skill}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsEntry;
