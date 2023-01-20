import React, { createContext, useState } from 'react';
import short from 'short-uuid';

type Alerts = {
  message: string;

  isFulfilled?: boolean;
  isPending: boolean;
  id: string;
}[];

type State = {
  alerts: {
    message: string;
    isFulfilled?: boolean;
    isPending: boolean;

    id: string;
  }[];
  createAlert: (msg: string) => string;
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

  const deleteAlert = (id: string) => {
    setAlerts((prevState) => prevState.filter((alert) => alert.id !== id));
  };

  const createAlert = (message: string, isPending = true) => {
    const id = short.generate();

    setAlerts((alerts) => [...alerts, { id, message, isPending }]);

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
    }, 1000);
  };

  return (
    <AlertContext.Provider
      // displayName="Alert Context"
      value={{
        alerts,
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
