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
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center ">
        <Dialog.Panel
          className={`${
            !backgroundColor ? 'bg-primary_t' : backgroundColor
          } flex h-3/4 w-1/2 flex-col   items-center justify-between rounded-[3rem] p-7`}
        >
          <div className="flex w-full items-center  justify-between">
            <h5 className="text-secondary">{title} </h5>
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
