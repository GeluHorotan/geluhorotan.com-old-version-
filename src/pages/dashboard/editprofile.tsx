import UpdatePasswordForm from '@/components/form/UpdatePasswordForm';
import UpdateProfileForm from '@/components/form/UpdateProfileForm';

function Editprofile() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-8  ">
      <UpdateProfileForm></UpdateProfileForm>
      <UpdatePasswordForm></UpdatePasswordForm>
    </div>
  );
}

export default Editprofile;
