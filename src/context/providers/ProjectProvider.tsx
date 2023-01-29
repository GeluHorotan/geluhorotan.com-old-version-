import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

import Role from '@/utils/roles';

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

type Developers = { value: string; label: string; profilePicture: string }[];

type Error = {
  response: {
    data: {
      errors: Array<{ msg: string }>;
    };
  };
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

  error: Error;
  developers: Developers;
  isLoading: boolean;

  setDevelopers: React.Dispatch<React.SetStateAction<Developers | undefined>>;
  setProjects: React.Dispatch<React.SetStateAction<Projects | undefined>>;
  fetchUsers: (role: number) => Promise<Error | undefined>;
  addProject: (details: ProjectDetails) => Promise<Error | undefined>;
};

export const ProjectContext = createContext<State>({} as State);

export const ProjectProvider = ({ children }: Props) => {
  const [projects, setProjects] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    fetchUsers(Role.Developer);
  }, []);

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
      setError(undefined);
      return res.data;
    } catch (err: any) {
      setError(err);
      return err;
    }
  };

  const fetchUsers = async (role = Role.User) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/users?filterByRole=${role}`, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': `${localStorage.getItem('token')}`,
        },
      });
      setError(undefined);
      setDevelopers(
        res.data.map((user: any) => {
          return {
            value: `${user.firstName} ${user.lastName}`,
            label: `${user.firstName} ${user.lastName}`,
            profilePicture: user.profilePicture,
          };
        })
      );
      setIsLoading(false);
      return res.data;
    } catch (err: any) {
      setIsLoading(false);
      setError(err);
      return err;
    }
  };

  return (
    <ProjectContext.Provider
      // displayName="Project Context"
      value={{
        projects,
        error,
        isLoading,
        developers,
        setDevelopers,
        fetchUsers,
        setProjects,
        addProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
