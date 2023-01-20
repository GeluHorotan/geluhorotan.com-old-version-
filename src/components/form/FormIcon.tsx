import type { ReactNode } from 'react';
import React from 'react';

type Props = {
  icon: ReactNode;
  error?: string;
};

const FormIcon = ({ icon, error }: Props) => {
  return (
    <div className={`${!error ? 'text-success' : 'text-error'}`}>{icon}</div>
  );
};

export default FormIcon;
