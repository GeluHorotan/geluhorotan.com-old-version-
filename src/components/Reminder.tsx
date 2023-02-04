import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { MdErrorOutline } from 'react-icons/md';

import Button from './Button';

type Props = {
  children: React.ReactNode;
};

const Reminder = ({ children }: Props) => {
  return (
    <div className="flex  w-full items-center justify-center gap-10 bg-primary_s_2 p-3 text-secondary">
      <div className="flex items-center gap-4">
        <MdErrorOutline size={27} className="text-yellow-500"></MdErrorOutline>
        <p className="tracking-wide ">{children}</p>
      </div>
      <div className="flex items-center gap-4">
        <Button
          type="button"
          className="rounded-lg border border-blue-400 py-0.5 px-2 uppercase"
        >
          Resend Link
        </Button>
        |<IoMdClose size={18}></IoMdClose>
      </div>
    </div>
  );
};

export default Reminder;
