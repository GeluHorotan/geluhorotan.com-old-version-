import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';

type Props = {
  title: string;
  role: string;
  date: string;
  children?: React.ReactNode;
  responsabilities: {
    text: string;
  }[];
  acquiredSkills: string[];
  githubURL: string;
  siteURL: string;
};

const ExperienceEntry: FC<Props> = ({
  title,
  role,
  date,
  responsabilities,
  acquiredSkills,
  githubURL,
  siteURL,
}) => {
  return (
    <div className="flex   flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3>{title}</h3>

        <div className="flex flex-col items-start   max-[1000px]:gap-1">
          <h6>{role}</h6>
          <p>{date}</p>
        </div>
      </div>

      <div className="flex flex-col gap-12">
        {responsabilities?.map((res, i) => {
          return (
            <p key={i} className="italic">
              # {res.text}
            </p>
          );
        })}
      </div>
      <div className="flex items-center gap-4 max-[1145px]:flex-col max-[1145px]:items-start">
        <h6>Acquired skills:</h6>
        <div className="flex gap-4 max-[1000px]:flex-col max-[1000px]:gap-1">
          {acquiredSkills?.map((skill, i) => {
            return <p key={i}>{skill}</p>;
          })}
        </div>
      </div>
      <div className="flex gap-4">
        <Link
          target="_blank"
          href={githubURL}
          className=" 
               w-max cursor-pointer  rounded-xl  border-2 border-accent px-4 py-2 text-primary  dark:border-accent2 dark:text-secondary "
        >
          GITHUB
        </Link>
        {siteURL && (
          <Link
            target="_blank"
            href={siteURL}
            className=" 
               w-max cursor-pointer  rounded-xl  border-2 border-accent px-4 py-2 text-primary  dark:border-accent2 dark:text-secondary "
          >
            VISIT
          </Link>
        )}
      </div>
    </div>
  );
};

export default ExperienceEntry;
