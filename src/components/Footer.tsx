import type { FC } from 'react';
import React from 'react';

type Props = {
  children?: React.ReactNode;
};

const Footer: FC<Props> = ({ children }) => {
  return (
    <div className="h-[50vh] items-center justify-center bg-primary py-14 px-20 text-secondary">
      <div className="grid grid-cols-3  gap-40 bg-blue-400">
        {' '}
        <div className="flex flex-col gap-4 bg-red-400">
          <p>About</p>
          <p>Projects</p>
          <p>Contact</p>
        </div>
        <div className="flex flex-col gap-4 bg-red-400">
          <p>Terms and Conditions</p>
          <p>Privacy Policy</p>
        </div>
        <div className="bg-red-400">T</div>
      </div>
    </div>
  );
};

export default Footer;
