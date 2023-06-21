import Image from 'next/dist/client/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { AiFillGithub, AiOutlineArrowLeft } from 'react-icons/ai';
import { MdAccountBalance } from 'react-icons/md';
import { TfiWorld } from 'react-icons/tfi';

import Button from '@/components/Button';
import LinesOfCode from '@/components/LinesOfCode';
import ProfilePicture from '@/components/ProfilePicture';
import Scrolldown from '@/components/Scrolldown';
import { useProject } from '@/context/hooks/useProject';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

type ProjectState = {
  githubRepo: string;
  fullProjectName: string;
  url: string;
  domain: string;
  desc: string;
  technologies: {
    _id: string;
    value: string;
    label: string;
  }[];
  team: {
    _id: string;
    profilePicture: string;
    value: string;
    label: string;
    role: string;
  }[];
  images: {
    gallery: string[];
    header: string;
  };
};

const ProjectID = () => {
  const [project, setProject] = useState<ProjectState | undefined>();
  const { projects } = useProject();
  const { fullProjectName, images, desc, domain, technologies, team } =
    project ?? {};

  const getProjectName = () => {
    const { pathname } = window.location;
    // Remove the leading and trailing slashes (if present)
    const trimmedPathname = pathname.replace(/^\/|\/$/g, '');
    // Extract the last segment of the pathname
    const lastSegment = trimmedPathname.substring(
      trimmedPathname.lastIndexOf('/') + 1
    );
    // Decode the URL-encoded string
    const decodedString = decodeURIComponent(lastSegment);

    return decodedString;
  };

  const getProject = () => {
    const projectName = getProjectName();
    const filteredProject = projects.filter(
      (project) => project.fullProjectName === projectName
    );
    setProject(filteredProject[0]);
  };

  useEffect(() => {
    getProject();
  }, [projects]);

  if (project)
    return (
      <Main
        meta={
          <Meta
            title="Gelu Horotan - Software Engineer"
            description={`Keep your account information up-to-date with my user friendly dashboard. `}
          />
        }
      >
        <section className="container !mt-16  flex flex-col items-center justify-center   py-10 max-lg:px-7 ">
          <div className="relative flex h-[75vh]  w-full items-center justify-center max-[1090px]:h-[50vh] max-md:h-[25vh]   ">
            <Image
              src={images.header}
              alt={fullProjectName}
              fill={true}
              priority
              className="inset-0 block h-auto w-full object-contain object-center"
            />
            <Scrolldown className=" " />
          </div>
          <div className="mx-auto flex h-full w-4/5 flex-col items-center justify-center gap-20   py-6 max-lg:w-full">
            <div className="flex flex-col items-center justify-center gap-2 ">
              <h1 className="futura-heavy">{fullProjectName}</h1>
              <div className="flex items-center justify-center gap-4 text-accent dark:text-accent2 ">
                <AiFillGithub
                  size={28}
                  className="cursor-pointer drop-shadow-lg transition-transform duration-150 ease-in-out hover:scale-110 dark:drop-shadow-none"
                />
                <TfiWorld
                  size={24}
                  className="cursor-pointer drop-shadow-lg transition-transform duration-150 ease-in-out hover:scale-110 dark:drop-shadow-none"
                />
              </div>
            </div>
            <div className="flex w-full flex-wrap  gap-4  p-1  max-md:flex-col">
              <div className="flex  flex-[1_1_33%]  items-center justify-between rounded-xl border border-accent px-6 py-2 font-bold tracking-widest text-primary dark:border-accent2 dark:text-secondary">
                LINES OF CODE
                <LinesOfCode repoName={project.githubRepo} />
              </div>
              <div className="flex flex-[1_1_33%] items-center justify-between rounded-xl border border-accent px-6 py-2 font-bold tracking-widest text-primary dark:border-accent2 dark:text-secondary">
                DOMAIN
                <p>{domain}</p>
              </div>
            </div>

            <div className="flex flex-col gap-6 self-start rounded-xl font-bold tracking-widest   text-primary dark:text-secondary max-md:items-center max-md:self-center">
              TECHNOLOGIES
              <div className="flex items-center justify-center gap-4 ">
                {technologies.map((technology, i) => {
                  return (
                    <div
                      key={technology._id}
                      className="flex items-center justify-center gap-2"
                    >
                      <Image
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${technology.value}/${technology.value}-original.svg`}
                        width={24}
                        height={24}
                        alt={technology.label}
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${technology.value}/${technology.value}-plain.svg`;
                        }}
                        className="drop-shadow-lg dark:drop-shadow-none"
                      />
                      <p>{technology.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col  gap-6  self-start rounded-xl font-bold tracking-widest   text-primary dark:text-secondary max-md:items-center max-md:self-center">
              CONTRIBUTORS
              <div className="flex items-center justify-center gap-2 ">
                {team.map((member, i) => {
                  return (
                    <div
                      key={member._id}
                      className=" flex  items-center justify-center gap-4 max-md:flex-col  "
                    >
                      <ProfilePicture
                        imageSrc={member.profilePicture}
                        size="medium"
                        className="drop-shadow-lg dark:drop-shadow-none"
                      />
                      <div className="flex flex-col items-start max-md:items-center">
                        {member.label}
                        <p className="text-sm">{member.role}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex w-full  flex-col gap-6  self-start  font-bold tracking-widest text-primary dark:text-secondary">
              DESCRIPTION
              <p className="text-justify indent-8 ">{desc}</p>
            </div>
            <div className="grid grid-cols-1 items-center justify-center gap-4">
              {images.gallery.map((image, i) => {
                return (
                  <Image
                    src={image}
                    key={i}
                    alt={fullProjectName}
                    width={1920}
                    height={1080}
                    className="w-full "
                  />
                );
              })}
            </div>
          </div>
        </section>
      </Main>
    );
};

export default ProjectID;
