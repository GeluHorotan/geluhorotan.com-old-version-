import React from 'react';

type Props = {
  children: React.ReactNode;
  desc: string;
};

const ProjectWrapper = ({ children, desc }: Props) => {
  return (
    <div className="flex w-full flex-col gap-8">
      <p>{desc}</p>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
};

export default ProjectWrapper;
