import { AnimatePresence } from 'framer-motion';
import React from 'react';

import { useAlert } from '@/context/hooks/useAlert';

import Alert from './Alert';

const AlertWrapper = () => {
  const { alerts } = useAlert();

  return (
    <div className="fixed right-5 bottom-5 flex w-1/5 flex-col justify-center gap-2 ">
      <AnimatePresence>
        {alerts.map((alert) => {
          return (
            <Alert
              key={alert.id}
              id={alert.id}
              message={alert.message}
              isFulfilled={alert.isFulfilled}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default AlertWrapper;
