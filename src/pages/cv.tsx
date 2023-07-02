/* eslint-disable react/no-unescaped-entities */
import { Disclosure } from '@headlessui/react';
import type { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { BiUpArrowAlt } from 'react-icons/bi';

import EducationEntry from '@/components/cv/EducationEntry';
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
      width="w-full"
      meta={
        <Meta
          title="Gelu Horotan - CV"
          description={`Curious to know more about the coding virtuoso behind the screen? Delve into my comprehensive curriculum vitae (CV) and discover my expertise, experience, and accomplishments. From my educational background to notable projects, this page provides an in-depth look into my coding prowess. Step into my professional world and witness the skills that can elevate your next development project.`}
        />
      }
    >
      <div className="item-center flex w-full justify-between gap-12 max-[1189px]:flex-col  ">
        {/* Exp */}
        <div className="flex w-1/2 flex-col gap-12 max-[1189px]:w-full">
          <h2 className="font-semibold  ">Experience</h2>
          <div className="w-full  ">
            <div className=" flex  w-full  max-w-full flex-col gap-4 rounded-2xl bg-secondary  dark:bg-primary">
              {cv?.experience.map((exp, i) => {
                return (
                  <Disclosure key={i}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="bg- flex w-full items-center justify-between rounded-lg bg-accent px-4 py-2 text-left text-sm font-medium text-secondary hover:bg-accent focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 dark:bg-accent2 dark:text-primary">
                          <div className="flex flex-col">
                            <h6>{exp.role}</h6>

                            <p>{exp.date}</p>
                          </div>
                          <BiUpArrowAlt
                            className={`${
                              open ? 'rotate-180 transform' : ''
                            } h-5 w-5 text-secondary transition-all duration-200 ease-in-out  dark:text-primary`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="flex  w-full flex-col gap-8 p-4 text-sm tracking-wide text-primary dark:text-secondary">
                          <h6 className="font-normal">{exp.title}</h6>

                          <ul className="flex list-inside list-disc flex-col flex-wrap gap-4">
                            {exp.responsabilities.map((res, i) => {
                              return (
                                <li key={i} className="text-base font-normal">
                                  {res.text}
                                </li>
                              );
                            })}
                          </ul>
                          <div>
                            <h6 className="flex flex-col flex-wrap ">
                              Acquired skills
                            </h6>
                            <ul className="flex list-inside list-disc flex-col items-start    ">
                              {exp.acquiredSkills.map((skill, i) => {
                                return (
                                  <li className=" text-lg font-light" key={i}>
                                    {skill}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <div className="flex gap-4">
                            {exp.siteURL && (
                              <Link
                                target="_blank"
                                href={exp.siteURL}
                                className=" 
            flex w-max cursor-pointer items-center rounded-xl    bg-accent px-4  py-2  text-secondary transition-all duration-200 ease-in-out hover:scale-105  dark:bg-accent2 dark:text-primary "
                              >
                                VISIT
                              </Link>
                            )}
                            {exp.githubURL && (
                              <Link
                                target="_blank"
                                href={exp.githubURL}
                                className=" 
             flex w-max cursor-pointer items-center rounded-xl border-2  border-accent px-4  py-2  text-primary transition-all duration-200 ease-in-out hover:scale-105  dark:border-accent2 dark:text-secondary "
                              >
                                GITHUB
                              </Link>
                            )}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                );
              })}
            </div>
          </div>
        </div>

        {/* Edu */}
        <div className="flex w-1/2 flex-col  gap-12 max-[1189px]:w-full">
          <div className="flex flex-col gap-12 ">
            <h2 className="font-semibold  ">Technical Skills</h2>
            <div className=" grid grid-cols-3 gap-2">
              {cv?.technologicalSkills.map((skill, i) => {
                return (
                  <div
                    key={i}
                    className="flex items-center gap-20 rounded-lg bg-accent py-2 px-4 text-secondary dark:bg-accent2 dark:text-primary "
                  >
                    {skill}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-12">
            <h2 className="font-semibold  ">Education</h2>
            {cv?.education.map((edu, i) => {
              return (
                <EducationEntry
                  key={i}
                  title={edu.title}
                  location={edu.location}
                  date={edu.date}
                  domain={edu.domain}
                />
              );
            })}
          </div>

          <div className="flex flex-col gap-12 ">
            <h2 className="font-semibold  ">Languages</h2>
            <div className="">
              {cv?.languages.map((lang, i) => {
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between text-secondary_s_2 "
                  >
                    <h6>{lang.name}</h6>
                    <p className="">{lang.level}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </TextTemplate>
  );
};

export default CV;
