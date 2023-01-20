import { motion } from 'framer-motion';
import React from 'react';
import { MdClose, MdErrorOutline, MdTaskAlt } from 'react-icons/md';

import { useAlert } from '@/context/hooks/useAlert';

type Props = {
  id: string;
  message: string;
  isFulfilled: boolean;
};

const Alert = ({ id, message, isFulfilled }: Props) => {
  const { deleteAlert } = useAlert();

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="relative h-16  cursor-pointer rounded-xl bg-secondary p-2 text-primary"
    >
      <div className="flex h-full w-full   items-center justify-between ">
        <div className="flex  items-center  justify-center   gap-2">
          {isFulfilled ? (
            <MdTaskAlt size={24} className={'text-success'} />
          ) : (
            <MdErrorOutline size={24} className={'text-error'} />
          )}

          <p className="text-base text-primary">{message}</p>
        </div>
        <div className="flex  h-full items-start">
          <MdClose
            size={16}
            className=" text-primary"
            onClick={() => deleteAlert(id)}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Alert;
