import { useContext } from 'react';

import { AuthContext } from '@/context/providers/AuthProvider';

export const useAuth = () => {
  return useContext(AuthContext);
};
