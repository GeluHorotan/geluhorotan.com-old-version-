import React, { createContext, useState } from 'react';
import short from 'short-uuid';

import Spinner from '@/components/Spinner';

type Alerts = {
  alertTitle: string;
  message: string | React.ReactNode;
  isFulfilled?: boolean;
  isPending: boolean;
  id: string;
}[];

type State = {
  alerts: {
    alertTitle: string;
    message: string | React.ReactNode;
    isFulfilled?: boolean;
    isPending: boolean;
    id: string;
  }[];
  alertDuration: number;
  createAlert: (alertTitle: string, isPending?: boolean) => string;
  updateAlert: (id: string, message: string, isSuccess: boolean) => void;
  deleteAlert: (id: string) => void;
  setAlerts: React.Dispatch<React.SetStateAction<Alerts>>;
};

type Props = {
  children: React.ReactNode;
};

export const AlertContext = createContext<State>({} as State);

export const AlertProvider = ({ children }: Props) => {
  const [alerts, setAlerts] = useState<Alerts>([]);
  const [alertDuration, setAlertDuration] = useState<number>(5);

  const deleteAlert = (id: string) => {
    setAlerts((prevState) => prevState.filter((alert) => alert.id !== id));
  };

  const createAlert = (alertTitle: string, isPending = true) => {
    const id = short.generate();
    const message = <Spinner size={'small'} />;

    setAlerts((alerts) => [...alerts, { id, alertTitle, message, isPending }]);

    return id;
  };

  const updateAlert = (id: string, message: string, isFulfilled: boolean) => {
    setAlerts((alerts) =>
      alerts.map((alert) => {
        if (alert.id === id) {
          return {
            ...alert,
            message,
            isFulfilled,
            isPending: false,
          };
        }
        return alert;
      })
    );
    setTimeout(() => {
      return deleteAlert(id);
    }, alertDuration * 1000);
  };

  return (
    <AlertContext.Provider
      // displayName="Alert Context"
      value={{
        alerts,
        alertDuration,
        createAlert,
        setAlerts,
        deleteAlert,
        updateAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
