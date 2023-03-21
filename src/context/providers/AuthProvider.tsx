import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

import { useAlert } from '@/context/hooks/useAlert';
import { socketEndpoint } from '@/utils/socketConnection';

import type { Response } from '../types';

type Props = {
  children: React.ReactNode;
};

type Callbacks = {
  onAuthSuccess: () => void;
};

export type User = {
  role: number;
  email: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
  _id: string;
  __v: number;
  profilePicture: string;
};

type State = {
  isLoading: boolean;
  isAuthenticated: boolean | undefined;
  user?: User;
  message?: {
    success: boolean;
    data?: any;
    msg: string;
  };
  error?:
    | Error
    | {
        0: {
          messages: {
            0: {
              message: string;
            };
          };
        };
      };
  setError: React.Dispatch<React.SetStateAction<Error | undefined>>;
  login: (credentials: LoginCredentials) => Promise<Error | undefined>;
  updateProfile: (credentials: UpdateCredentials) => Promise<Error | undefined>;
  register: (credentials: RegisterCredentials) => Promise<Error | undefined>;
  fetchUser: () => Promise<Error | undefined>;
  verifyEmail: (params: VerifyMailParams) => any;
  resendEmailVerification: (params: ResendEmailVerificationParams) => any;
  logout: () => Promise<void>;

  setCallbacks: React.Dispatch<React.SetStateAction<Callbacks | undefined>>;
};

type VerifyMailParams = {
  user_id: string;
  verification_token: string;
};

type ResendEmailVerificationParams = {
  user_id: string;
};

type LoginCredentials = {
  email: string;
  password: string;
};
type UpdateCredentials = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  oldPassword?: string;
};
type RegisterCredentials = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture?: string;
};

export const AuthContext = createContext<State>({} as State);

export const AuthProvider = ({ children }: Props) => {
  // Websocket

  const socket = io('https://geluhorotancom-horotangelu17.b4a.run');

  // Alerts
  const { createAlert, updateAlert } = useAlert();

  // State
  const [user, setUser] = useState();
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );
  const [callbacks, setCallbacks] = useState<Callbacks>();

  useEffect(() => {
    if (isAuthenticated) {
      callbacks?.onAuthSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const logout = async () => {
    const alertId = createAlert('Logout');
    setIsLoading(true);

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser(undefined);
    setIsAuthenticated(false);
    setIsLoading(false);
    updateAlert(alertId, `You're now logged out!`, true);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoading(true);
      setIsAuthenticated(true);
      // Test the current stored token
      const fetchCurrentUser = async () => {
        try {
          const res = await axios.get('/api/auth', {
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': `${localStorage.getItem('token')}`,
            },
          });
          localStorage.setItem('user', JSON.stringify(res.data.user));
          setError(undefined);
          setIsLoading(false);

          return res.data;
        } catch (err: any) {
          const { data } = err.response;
          setError(err);
          setIsLoading(false);
          return data;
        }
      };
      fetchCurrentUser();
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    window.addEventListener('logout', async () => {
      await logout();
    });
    socket.on('email-confirmation', (updatedUser) => {
      // console.log(message);
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    });
    socket.on('test', (message) => {
      console.log(message);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const register = async ({
    firstName,
    lastName,
    email,
    password,
    profilePicture,
  }: RegisterCredentials) => {
    const alertId = createAlert('Register');
    setIsLoading(true);
    const body = JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      profilePicture,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/users', body, config);

      // localStorage.setItem('token', JSON.stringify(res.data.token));

      setError(undefined);
      setIsAuthenticated(false);
      setIsLoading(false);
      updateAlert(alertId, res.data.msg, res.data.success);

      return res.data;
    } catch (err: any) {
      const { data } = err.response;
      setError(err);

      setIsLoading(false);
      updateAlert(alertId, data.msg, data.success);
      return data;
    }
  };

  const verifyEmail = async ({
    user_id,
    verification_token,
  }: VerifyMailParams) => {
    setIsLoading(true);
    const body = { user_id, verification_token };
    try {
      const res = await axios.put('/api/users/email-confirmation', body);

      setError(undefined);
      setIsLoading(false);

      return res.data;
    } catch (err: any) {
      const { data } = err.response;
      setError(err);
      setIsLoading(false);
      return data;
    }
  };

  const resendEmailVerification = async ({
    user_id,
  }: ResendEmailVerificationParams) => {
    const alertId = createAlert('Resend Email Verification');
    setIsLoading(true);
    const body = { user_id };
    try {
      const res = await axios.post(
        '/api/users/resend-email-confirmation',
        body
      );

      setError(undefined);
      setIsLoading(false);
      updateAlert(alertId, res.data.msg, res.data.success);
      return res.data;
    } catch (err: any) {
      const { data } = err.response;
      setError(err);
      setIsLoading(false);
      updateAlert(alertId, data.msg, data.success);
      return data;
    }
  };

  const fetchUser = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get('/api/auth', {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': `${localStorage.getItem('token')}`,
        },
      });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setIsAuthenticated(true);
      setUser(res.data.user);
      setError(undefined);
      setIsLoading(false);
      return res.data;
    } catch (err: any) {
      const { data } = err.response;

      setError(err);
      setIsLoading(false);
      return data;
    }
  };

  const login = async ({ email, password }: LoginCredentials) => {
    const alertId = createAlert('Login');

    setIsLoading(true);
    const body = { email, password };

    try {
      const res = await axios.post('/api/auth', body);

      updateAlert(alertId, res.data.msg, res.data.success);
      localStorage.setItem('token', res.data.token);

      await fetchUser();
      setError(undefined);
      setIsLoading(false);

      return res.data;
    } catch (err: any) {
      const { data } = err.response;
      updateAlert(alertId, data.msg, data.success);
      console.log(data, 'login data err');
      setError(err);
      setIsLoading(false);

      return data;
    }
  };

  const updateProfile = async (body: UpdateCredentials) => {
    setIsLoading(true);
    const alertId = createAlert('Update Profile');

    try {
      const res = await axios.put('/api/profile/update', body, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': `${localStorage.getItem('token')}`,
        },
      });

      setError(undefined);

      await fetchUser();
      setIsLoading(false);
      updateAlert(alertId, res.data.msg, res.data.success);
      return res.data;
    } catch (err: any) {
      const { data } = err.response;
      await logout();
      setError(err);
      setIsLoading(false);
      updateAlert(alertId, data.msg, data.success);
      return data;
    }
  };

  return (
    <AuthContext.Provider
      // displayName="Auth Context"
      value={{
        isLoading,
        isAuthenticated,
        user,
        error,
        setError,
        login,
        logout,
        register,
        updateProfile,
        fetchUser,
        verifyEmail,
        resendEmailVerification,
        setCallbacks,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
