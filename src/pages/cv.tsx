/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from 'next';
import React, { useEffect } from 'react';

import EducationEntry from '@/components/cv/EducationEntry';
import ExperienceEntry from '@/components/cv/ExperienceEntry';
import LanguageEntry from '@/components/cv/LanguageEntry';
import SkillsEntry from '@/components/cv/SkillsEntrys';
import cv from '@/data/cv.json';
import { Meta } from '@/layouts/Meta';
import { TextTemplate } from '@/templates/TextTemplate';

type Props = {
  children?: React.ReactNode;
};

const CV: NextPage<Props> = () => {
  return (
    <TextTemplate
      pageTitle="CV"
      headerPadding
      bodyPadding
      bottomBodyPadding
      meta={
        <Meta
          title="Gelu Horotan - CV"
          description={`Curious to know more about the coding virtuoso behind the screen? Delve into my comprehensive curriculum vitae (CV) and discover my expertise, experience, and accomplishments. From my educational background to notable projects, this page provides an in-depth look into my coding prowess. Step into my professional world and witness the skills that can elevate your next development project.`}
        />
      }
    >
      <h4 className="w-full">
        Detail-oriented professional and critical thinker with a flair for
        creating elegant solutions in the least amount of time. Highly motivated
        to use my skills and knowledge to bring value to your company.
      </h4>
      <div className="flex flex-col gap-12">
        <h2 className="font-semibold  ">Experience</h2>
        {cv?.experience.map((exp, i) => {
          return (
            <ExperienceEntry
              key={i}
              title={exp.title}
              role={exp.role}
              date={exp.date}
              responsabilities={exp.responsabilities}
              acquiredSkills={exp.acquiredSkills}
              githubURL={exp.githubURL}
              siteURL={exp.siteURL}
            />
          );
        })}
      </div>
      <div className="flex flex-col gap-12">
        <h2 className="font-semibold  ">Education</h2>
        {cv?.education.map((edu, i) => {
          return (
            <EducationEntry
              key={i}
              title={edu.title}
              date={edu.date}
              domain={edu.domain}
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-12">
        <h2 className="font-semibold  ">Skills</h2>

        <SkillsEntry
          softSkills={cv.skills.softSkills}
          hardSkills={cv.skills.hardSkills}
        />
      </div>
      <div className="flex flex-col gap-12">
        <h2 className="font-semibold  ">Languages</h2>

        {cv?.languages.map((lang, i) => {
          return <LanguageEntry key={i} name={lang.name} level={lang.level} />;
        })}
      </div>
    </TextTemplate>
  );
};

export default CV;
