import type { ReactElement } from 'react';

import UpdatePasswordForm from '@/components/form/UpdatePasswordForm';
import UpdateProfileForm from '@/components/form/UpdateProfileForm';
import DashLayout from '@/layouts/DashLayout';

function Editprofile() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-8  ">
      <UpdateProfileForm></UpdateProfileForm>
      <UpdatePasswordForm></UpdatePasswordForm>
    </div>
  );
}

Editprofile.getLayout = (page: ReactElement) => {
  return <DashLayout>{page}</DashLayout>;
};

export default Editprofile;
