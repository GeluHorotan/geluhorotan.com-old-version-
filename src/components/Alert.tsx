import { motion, useAnimationControls } from 'framer-motion';
import React, { useEffect } from 'react';
import { MdClose, MdErrorOutline, MdTaskAlt } from 'react-icons/md';

import { useAlert } from '@/context/hooks/useAlert';

type Props = {
  id: string;
  message: string;
  isFulfilled: boolean;
  isPending: boolean;
  alertTitle: string;
};

const Alert = ({ id, message, isFulfilled, isPending, alertTitle }: Props) => {
  const { deleteAlert, alertDuration } = useAlert();

  const decodedHtml = { __html: message && message };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.1 }}
      className=" relative cursor-pointer bg-gray-800  "
    >
      {!isPending && (
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: alertDuration + 0.3 }}
          className={`absolute top-0 left-0 h-1  ${
            isFulfilled ? 'bg-success' : isPending ? 'bg-blue-400' : 'bg-error'
          } `}
        ></motion.div>
      )}

      <div className="relative flex  items-center justify-between   p-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h6 className=" tracking-tight text-secondary_t">{alertTitle}</h6>
            {isFulfilled ? (
              <MdTaskAlt size={18} className={'text-success'} />
            ) : (
              <MdErrorOutline size={18} className={'text-error'} />
            )}
          </div>
          <p
            className="  text-base text-secondary_s_2"
            dangerouslySetInnerHTML={decodedHtml}
          ></p>
        </div>
        <p className=" text-blue-400" onClick={() => deleteAlert(id)}>
          Dismiss
        </p>
      </div>
    </motion.div>
  );
};

export default Alert;
