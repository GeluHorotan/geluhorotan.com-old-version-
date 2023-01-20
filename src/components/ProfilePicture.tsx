import Image from 'next/image';
import React from 'react';

import { useAuth } from '@/context/hooks/useAuth';

type Props = {
  size?: string;
};

const ProfilePicture = ({ size }: Props) => {
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
      alt={`${user?.firstName}'s profile picture`}
      src={user?.profilePicture}
      className={'rounded-full'}
    ></Image>
  );
};

export default ProfilePicture;
