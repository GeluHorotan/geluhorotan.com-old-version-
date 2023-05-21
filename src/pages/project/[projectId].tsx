import Image from 'next/dist/client/image';
import { Fragment, useEffect, useState } from 'react';
import { AiFillGithub, AiOutlineArrowLeft } from 'react-icons/ai';
import { MdAccountBalance } from 'react-icons/md';
import { TfiWorld } from 'react-icons/tfi';

import Button from '@/components/Button';
import ProfilePicture from '@/components/ProfilePicture';
import { useProject } from '@/context/hooks/useProject';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

type ProjectState = {
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
    mobile: string;
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
  console.log(project);
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
        <section className="container  flex flex-col items-center justify-center ">
          <div className="flex h-screen  w-full flex-col items-center justify-center gap-6  ">
            <Button
              type="button"
              className="flex w-full  items-center justify-center gap-1 self-start  !text-accent2 underline"
            >
              <AiOutlineArrowLeft size={16} /> BACK
            </Button>
            <Image
              src={images.header}
              alt={fullProjectName}
              width={1280}
              height={720}
            />
          </div>
          <div className="mx-auto flex h-full w-4/6 flex-col items-center justify-center gap-20  py-6">
            <div className="flex flex-col items-center justify-center gap-2">
              <h1 className="futura-heavy">{fullProjectName}</h1>
              <div className="flex items-center justify-center gap-4 text-accent dark:text-accent2">
                <AiFillGithub
                  size={28}
                  className="cursor-pointer transition-all duration-150 ease-in-out hover:scale-110"
                />
                <TfiWorld
                  size={24}
                  className="cursor-pointer transition-all duration-150 ease-in-out hover:scale-110"
                ></TfiWorld>
              </div>
            </div>
            <div className="flex w-full   flex-wrap  gap-3  p-1">
              <div className="flex  flex-[1_1_33%] items-center justify-between rounded-xl border border-accent2 px-6 py-2 font-bold tracking-widest text-secondary">
                LINES OF CODE
                <p>98.820</p>
              </div>
              <div className="flex flex-[1_1_33%] items-center justify-between rounded-xl border border-accent2 px-6 py-2 font-bold tracking-widest text-secondary">
                DOMAIN
                <p className="">{domain}</p>
              </div>
              <div className="flex flex-[1_1_33%] items-center justify-center gap-4 rounded-xl border border-accent2 px-6 py-2 font-bold tracking-widest text-secondary">
                TECHNOLOGIES
                <div className="flex items-center justify-center gap-2">
                  {technologies.map((technology, i) => {
                    return (
                      <div
                        key={technology._id}
                        className="flex items-center justify-center gap-1"
                      >
                        <Image
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${technology.value}/${technology.value}-original.svg`}
                          width={32}
                          height={32}
                          alt={technology.label}
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${technology.value}/${technology.value}-plain.svg`;
                          }}
                        />
                        <p>{technology.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* to place later */}
            </div>
            <div className="flex flex-col  gap-6 self-start rounded-xl    font-bold tracking-widest text-secondary">
              CONTRIBUTORS
              <div className="flex items-center justify-center gap-2">
                {team.map((member, i) => {
                  return (
                    <div
                      key={member._id}
                      className="flex flex-col items-center justify-center gap-1"
                    >
                      <ProfilePicture
                        imageSrc={member.profilePicture}
                        size="medium"
                      />
                      <p>{member.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col  gap-6 self-start    font-bold tracking-widest text-secondary">
              DESCRIPTION
              <p className="indent-8">{desc}</p>
            </div>
          </div>
        </section>
      </Main>
    );
};

export default ProjectID;
