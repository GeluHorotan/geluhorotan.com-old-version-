import axios from 'axios';
import React, { createContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

type ProjectDetails = {
  fullProjectName: string;

  abbreviation: string;
  desc: string;
  startDate: string;
  endDate: string;
  technologies: {
    value: string;
    label: string;
  }[];
  team: {
    value: string;
    label: string;
  }[];
};

type Projects = {
  fullProjectName: string;
  desc: string;
  startDate: string;
  endDate: string;
  technologies: {
    value: string;
    label: string;
  }[];
}[];

type State = {
  projects: Projects;

  setProjects: React.Dispatch<React.SetStateAction<Projects | undefined>>;
  addProject: (details: ProjectDetails) => Promise<Error | undefined>;
};

export const ProjectContext = createContext<State>({} as State);

export const ProjectProvider = ({ children }: Props) => {
  const [projects, setProjects] = useState([]);

  const addProject = async ({
    fullProjectName,
    desc,
    startDate,
    endDate,
    technologies,
  }: ProjectDetails) => {
    const body = JSON.stringify({
      fullProjectName,
      desc,
      startDate,
      endDate,
      technologies,
    });

    try {
      const res = await axios.post('/backend/projects', body, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': `${localStorage.getItem('token')}`,
        },
      });
      setProjects(res.data);
      return res.data;
    } catch (error) {
      return error;
    }
  };

  return (
    <ProjectContext.Provider
      // displayName='Project Context'
      value={{
        projects,
        setProjects,
        addProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
