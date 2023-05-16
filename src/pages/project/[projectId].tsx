import { useRouter } from 'next/router';
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
  console.log(projects);
  const getProjectName = () => {
    const { pathname } = window.location;
    console.log(pathname, 'path');
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
  return (
    <Main
      meta={
        <Meta
          title="Gelu Horotan - Software Engineer"
          description={`Keep your account information up-to-date with my user friendly dashboard. `}
        />
      }
    >
      <section className={'container  flex items-center justify-center   '}>
        {project && project.fullProjectName}
      </section>
    </Main>
  );
};

export default ProjectID;
