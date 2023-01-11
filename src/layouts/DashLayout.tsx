import React from 'react';

import DashboardSidebar from '@/components/DashboardSidebar';

type Props = {
  children: React.ReactNode;
};

const DashLayout = ({ children }: Props) => {
  return (
    <div className="mt-12 flex h-[81.6vh] w-full items-center justify-center ">
      <DashboardSidebar />
      <div className="flex h-full  w-full items-center justify-center p-12 ">
        {children}
      </div>
    </div>
  );
};

export default DashLayout;
