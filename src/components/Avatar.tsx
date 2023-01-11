import Image from 'next/dist/client/image';

import { useAuth } from '@/context/hooks/useAuth';

type Props = {
  size?: string;
};

const Avatar = ({ size }: Props) => {
  const { user } = useAuth();

  return (
    <>
      <Image
        src={`/${user?.profilePicture}`}
        width={320}
        height={320}
        alt="profilePicture"
      ></Image>
    </>
  );
};

export default Avatar;
