import axios from 'axios';
import React, { createContext, useState } from 'react';

import { useAlert } from '../hooks/useAlert';

type Error = {
  response: {
    data: {
      errors: Array<{ msg: string }>;
    };
  };
};

type Message = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
};

type Props = {
  children: React.ReactNode;
};

type State = {
  isLoading: boolean;
  error: Error;
  sendMessage: (credentials: Message) => Promise<Error | undefined>;
};

export const ContactContext = createContext<State>({} as State);

export const ContactProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const { createAlert, updateAlert } = useAlert();

  const sendMessage = async ({
    firstName,
    lastName,
    email,
    subject,
    message,
    consent,
  }: Message) => {
    const alertId = createAlert('Contact');

    setIsLoading(true);
    const body = { firstName, lastName, email, subject, message, consent };

    try {
      const res = await axios.post('/api/contact', body);

      updateAlert(alertId, res.data.msg, res.data.success);

      setError(undefined);
      setIsLoading(false);
      return res.data;
    } catch (err: any) {
      const { data } = err.response;
      updateAlert(alertId, data.msg, data.success);
      setError(err);
      setIsLoading(false);
      return data;
    }
  };

  return (
    <ContactContext.Provider
      // displayName="Contact Context"
      value={{
        error,
        isLoading,
        sendMessage,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
