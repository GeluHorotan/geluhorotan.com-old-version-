import { Dialog } from '@headlessui/react';
import React from 'react';
// Close Icon
import { IoMdClose } from 'react-icons/io';

type Props = {
  isOpen: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
  backgroundColor?: string;
  className?: string;
};

const ModalWrapper = ({
  isOpen,
  setIsOpen,
  children,
  className,
  title,
  backgroundColor,
}: Props) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0  bg-black/60" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center  ">
        <Dialog.Panel
          className={`${
            !backgroundColor ? 'bg-primary_t' : backgroundColor
          } relative flex h-5/6  w-11/12 flex-col items-center  justify-between rounded-lg  p-7 `}
        >
          <div className="absolute top-0 left-0 z-50 flex w-full items-center justify-between py-2 px-4 text-secondary  ">
            <h5 className="">{title} </h5>
            <IoMdClose
              size={32}
              onClick={() => setIsOpen(false)}
              className="cursor-pointer self-end"
            />
          </div>

          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ModalWrapper;
