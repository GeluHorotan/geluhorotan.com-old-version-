import React from 'react';

import { useAlert } from '@/context/hooks/useAlert';

import Alert from './Alert';

const AlertWrapper = () => {
  const { alerts } = useAlert();

  if (alerts.length !== 0)
    return (
      <div className=" fixed    right-5 bottom-5 flex w-1/5 flex-col justify-center gap-2">
        {alerts.map((alert) => {
          return (
            <Alert
              id={alert.id}
              message={alert.message}
              isSuccess={alert.isSuccess}
              key={alert.id}
            />
          );
        })}
      </div>
    );

  return null;
};

export default AlertWrapper;
