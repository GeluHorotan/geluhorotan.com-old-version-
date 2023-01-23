import Image from 'next/image';
import React from 'react';

import { useAuth } from '@/context/hooks/useAuth';

type Props = {
  size?: string;
  imageSrc?: string;
  userFirstName?: string;
};

const ProfilePicture = ({ size, imageSrc, userFirstName }: Props) => {
  const { user } = useAuth();

  const dimensions: { [key: string]: number } = {
    small: 30,
    medium: 75,
    large: 150,
  };

  const width = dimensions[size] || 30;
  const height = dimensions[size] || 30;

  return (
    <Image
      width={width}
      height={height}
      alt={`${
        !userFirstName ? user?.firstName : userFirstName
      }'s profile picture`}
      src={!imageSrc ? user?.profilePicture : imageSrc}
      className={'rounded-full'}
    />
  );
};

export default ProfilePicture;
