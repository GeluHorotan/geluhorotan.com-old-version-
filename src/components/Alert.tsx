import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { MdClose, MdErrorOutline, MdTaskAlt } from 'react-icons/md';

import { useAlert } from '@/context/hooks/useAlert';

type Props = {
  id: string;
  message: string;
  isSuccess: boolean;
};

const Alert = ({ id, message, isSuccess }: Props) => {
  const { deleteAlert } = useAlert();

  const [constrained] = useState<boolean>(true);
  const [direction, setDirection] = useState<string>();

  const alertElem = useRef(null);
  const x = useMotionValue(0);

  const getDirection = () => {
    if (x.getVelocity() >= 1) {
      return 'right';
    }
    if (x.getVelocity() <= -1) {
      return 'left';
    }
    return undefined;
  };

  const getTrajectory = () => {
    setDirection(getDirection());
  };

  const flyAway = (min: number, alertId: string) => {
    if (direction && Math.abs(x.getVelocity()) > min) {
      deleteAlert(alertId);
    }
  };

  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 15,
  };

  return (
    <AnimatePresence>
      <motion.div
        layout
        key={id}
        transition={spring}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 5000, opacity: 0 }}
        dragConstraints={
          constrained && { left: 0, right: 0, top: 0, bottom: 0 }
        }
        dragElastic={1}
        drag="x"
        ref={alertElem}
        style={{ x }}
        onDrag={getTrajectory}
        onDragEnd={() => flyAway(500, id)}
        className=" relative h-16  cursor-pointer rounded-xl bg-secondary p-2   text-primary "
      >
        <div className="flex h-full w-full   items-center justify-between ">
          <div className="flex  items-center  justify-center   gap-2">
            {isSuccess ? (
              <MdTaskAlt size={24} className={'text-success'} />
            ) : (
              <MdErrorOutline size={24} className={'text-error'} />
            )}

            <p className="text-base text-primary">{message}</p>
          </div>
          <div className="flex  h-full items-start">
            <MdClose size={16} className=" text-primary" />
          </div>
        </div>

        <motion.div
          animate={{ width: 0 }}
          initial={{ width: '100%' }}
          transition={{ ease: 'linear', duration: 5 }}
          className={`h-1 ${
            isSuccess ? 'bg-success' : 'bg-error'
          } absolute bottom-0 left-0 rounded-xl  `}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Alert;
