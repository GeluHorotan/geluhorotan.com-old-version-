import Image from 'next/dist/client/image';
import { useEffect, useState } from 'react';

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
  const { fullProjectName, images, desc, domain, technologies } = project ?? {};

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
        <section className={'container gap-10  '}>
          <div className=" flex h-full w-full flex-col items-center justify-center gap-10 px-20 ">
            <Image
              src={images.header}
              objectFit="cover"
              layout="fill"
              className=" w-full"
              alt={`${project.fullProjectName}'s image`}
            />

            <div className="flex flex-col items-center justify-center">
              <p className="uppercase tracking-widest text-primary_t_2 dark:text-secondary_s_2 ">
                {domain}
              </p>
              <h1 className="">{fullProjectName}</h1>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <h6 className="text-primary_t_2 dark:text-secondary_s_2">
                Tech Stack
              </h6>
              <div className="flex items-center justify-center gap-4">
                {technologies.map((technology, i) => {
                  return (
                    <div
                      key={technology._id}
                      className=" flex flex-col items-center justify-center"
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
          </div>
        </section>
      </Main>
    );
};

export default ProjectID;
