import { useContext } from 'react';

import { ProjectContext } from '@/context/providers/ProjectProvider';

export const useProject = () => {
  return useContext(ProjectContext);
};
