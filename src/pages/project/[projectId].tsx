import Image from 'next/dist/client/image';
import { useEffect, useState } from 'react';
import { MdAccountBalance } from 'react-icons/md';

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
        <section className="flex h-max w-full flex-col items-center justify-center  gap-8 px-20 ">
          <div className=" flex h-max w-full flex-col items-center justify-center gap-10 ">
            <Image
              src={images.header}
              width={0}
              height={0}
              //   fill
              sizes="100vw"
              className="h-auto w-full"
              alt={`${project.fullProjectName}'s image`}
            />

            <div className="flex flex-col items-center justify-center">
              <p className="uppercase tracking-widest text-primary_t_2 dark:text-secondary_s_2 ">
                {domain}
              </p>
              <h1 className="text-primary dark:text-secondary">
                {fullProjectName}
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <h6 className="text-primary_t dark:text-secondary_s">
                Tech Stack
              </h6>
              <div className="flex items-center justify-center gap-6">
                {technologies.map((technology, i) => {
                  return (
                    <div
                      key={technology._id}
                      className=" flex flex-col items-center justify-center gap-1"
                    >
                      <Image
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${technology.value}/${technology.value}-original.svg`}
                        width={40}
                        height={40}
                        alt={technology.label}
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${technology.value}/${technology.value}-plain.svg`;
                        }}
                      />
                      <p className="text-primary_t_2 dark:text-secondary_s_2">
                        {technology.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <h6 className="text-primary_t dark:text-secondary_s">Team</h6>
              <div className="flex items-center justify-center gap-6">
                {team.map((member, i) => {
                  return (
                    <div
                      key={member._id}
                      className=" flex flex-col items-center justify-center gap-1"
                    >
                      <ProfilePicture
                        imageSrc={member.profilePicture}
                        userFirstName={member.value}
                        size="small"
                      />
                      <p className="text-primary_t_2 dark:text-secondary_s_2">
                        {member.label} - {member.role}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex  flex-col items-center justify-center gap-2">
              <h6 className="text-primary_t dark:text-secondary_s">
                Main Features
              </h6>
              <div className="grid grid-cols-2 gap-10">
                <div className="flex flex-col items-center justify-center rounded-xl bg-primary_t_2 p-6 dark:bg-secondary_s_2">
                  <MdAccountBalance size={32}></MdAccountBalance>
                  User Account
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl bg-primary_t_2 p-6 dark:bg-secondary_s_2">
                  <MdAccountBalance size={32}></MdAccountBalance>
                  User Account
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl bg-primary_t_2 p-6 dark:bg-secondary_s_2">
                  <MdAccountBalance size={32}></MdAccountBalance>
                  User Account
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl bg-primary_t_2 p-6 dark:bg-secondary_s_2">
                  <MdAccountBalance size={32}></MdAccountBalance>
                  User Account
                </div>
              </div>
            </div>
            <p className="text-secondary"> {desc}</p>
          </div>
        </section>
        <section className="container"></section>
      </Main>
    );
};

export default ProjectID;
