import { useContext } from 'react';

import { ContactContext } from '@/context/providers/ContactProvider';

export const useContact = () => {
  return useContext(ContactContext);
};
