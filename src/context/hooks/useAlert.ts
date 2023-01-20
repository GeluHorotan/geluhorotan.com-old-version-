import { useContext } from 'react';

import { AlertContext } from '@/context/providers/AlertProvider';

export const useAlert = () => {
  return useContext(AlertContext);
};
