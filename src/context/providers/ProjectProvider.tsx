import axios from 'axios';
import type { Key } from 'react';
import React, { createContext, useEffect, useState } from 'react';

import Role from '@/utils/roles';

type Props = {
  children: React.ReactNode;
};
type User = {
  firstName: string;
  lastName: string;
  profilePicture: string;
};

export type ProjectDetails = {
  fullProjectName: string;
  url: string;
  githubRepo: string;
  domain: string;
  desc: string;
  technologies: {
    value: string;
    label: string;
    _id: string;
  }[];
  team: {
    value: string;
    label: string;
    role: string;
  }[];
  images: {
    gallery: string[];
    header: string;
  };
};

type Developers = {
  _id: string;
  profilePicture: string;
  value: string;
  label: string;
  role: string;
}[];

type Error = {
  response: {
    data: {
      errors: Array<{ msg: string }>;
    };
  };
};

type Projects = {
  _id: string;
  domain: string;
  githubRepo: string;
  url: string;
  fullProjectName: string;
  desc: string;
  technologies: {
    value: string;
    label: string;
    _id: string;
  }[];
  team: Developers;
  images: {
    gallery: string[];
    header: string;
  };
}[];

type State = {
  projects: Projects;
  isLoading: boolean;
  error: Error;
  developers: Developers;

  setDevelopers: React.Dispatch<React.SetStateAction<Developers | undefined>>;
  setProjects: React.Dispatch<React.SetStateAction<Projects | undefined>>;
  fetchUsers: (role: number) => Promise<Error | undefined>;
  addProject: (details: ProjectDetails) => Promise<Error | undefined>;
};

export const ProjectContext = createContext<State>({} as State);

export const ProjectProvider = ({ children }: Props) => {
  const [projects, setProjects] = useState([]);
  const [developers, setDevelopers] = useState<Developers>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    fetchUsers(Role.Developer);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, []);

  const addProject = async ({
    fullProjectName,
    githubRepo,
    domain,
    desc,
    technologies,
    team,
    url,
    images,
  }: ProjectDetails) => {
    setIsLoading(true);
    const body = JSON.stringify({
      fullProjectName,
      domain,
      githubRepo,
      desc,
      technologies,
      team,
      url,
      images,
    });

    try {
      const res = await axios.post('/api/projects', body, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': `${localStorage.getItem('token')}`,
        },
      });
      fetchProjects();
      setError(undefined);
      setIsLoading(false);
      return res.data;
    } catch (err: any) {
      setError(err);
      setIsLoading(false);
      return err.response;
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        'https://geluhorotancom-horotangelu17.b4a.run/api/projects'
      );
      setProjects(res.data.projects);

      setError(undefined);
      setIsLoading(false);
    } catch (err: any) {
      setError(err);

      setIsLoading(false);
      return err.response;
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
        res.data.users.map((user: User) => {
          return {
            value: `${user.firstName} ${user.lastName}`,
            label: `${user.firstName} ${user.lastName}`,
            profilePicture: user.profilePicture,
            role: '',
          };
        })
      );
      setError(undefined);
      setIsLoading(false);
      return res.data;
    } catch (err: any) {
      setError(err);
      setIsLoading(false);
      return err.response;
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
