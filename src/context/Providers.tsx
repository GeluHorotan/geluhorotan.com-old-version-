import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthProvider } from '@/context/providers/AuthProvider';

import { AlertProvider } from './providers/AlertProvider';
import { ContactProvider } from './providers/ContactProvider';
import { ProjectProvider } from './providers/ProjectProvider';

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AlertProvider>
        <AuthProvider>
          <ProjectProvider>
            <ContactProvider>{children}</ContactProvider>
          </ProjectProvider>
        </AuthProvider>
      </AlertProvider>
    </QueryClientProvider>
  );
};
