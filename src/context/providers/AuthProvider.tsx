import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

import { useAlert } from '@/context/hooks/useAlert';

type Props = {
  children: React.ReactNode;
};

type Callbacks = {
  onAuthSuccess: () => void;
};

export type User = {
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
  message: string;
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
  setMessage?: React.Dispatch<React.SetStateAction<string | undefined>>;
  login: (credentials: LoginCredentials) => Promise<Error | undefined>;
  updateProfile: (credentials: UpdateCredentials) => Promise<Error | undefined>;
  register: (credentials: RegisterCredentials) => Promise<Error | undefined>;
  fetchUser: () => Promise<Error | undefined>;
  verifyEmail: (params: VerifyMailParams) => Promise<Error | undefined>;
  resendEmailVerification: (
    params: ResendEmailVerificationParams
  ) => Promise<Error | undefined>;
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
  const { createAlert, updateAlert } = useAlert();
  const [message, setMessage] = useState();
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
    setIsLoading(true);

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    createAlert(`You're now logged out. `);
    setUser(undefined);
    setIsAuthenticated(false);
    setIsLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
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
          localStorage.setItem('user', JSON.stringify(res.data));
          setIsLoading(false);

          return res.data;
        } catch (err) {
          await logout();
          return err;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const register = async ({
    firstName,
    lastName,
    email,
    password,
    profilePicture,
  }: RegisterCredentials) => {
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

    setIsLoading(true);
    const alertId = createAlert(`Registering user...`);

    try {
      const res = await axios.post('/api/users', body, config);
      localStorage.setItem('token', JSON.stringify(res.data.data));

      setError(undefined);
      setIsAuthenticated(false);
      setIsLoading(false);
      updateAlert(alertId, res.data.msg, res.data.success);
      console.log(res, 'err');
      return res;
    } catch (err: any) {
      setIsLoading(false);
      const res = err.response.data;
      console.log(err.response, 'err');
      updateAlert(alertId, res.error, res.success);
      return res;
    }
  };

  const verifyEmail = async ({
    user_id,
    verification_token,
  }: VerifyMailParams) => {
    const body = { user_id, verification_token };
    setIsLoading(true);
    try {
      const res = await axios.put('/api/users/email-verification', body);
      setIsLoading(false);
      if (res.data?.msg) {
        setMessage(res.data.msg);
      }
      return res;
    } catch (err: any) {
      setError(err);
      setIsLoading(false);
      return err;
    }
  };

  const resendEmailVerification = async ({
    user_id,
  }: ResendEmailVerificationParams) => {
    const body = { user_id };
    try {
      const res = await axios.post(
        '/api/users/resend-email-verification',
        body
      );
      if (res.data?.msg) {
        setMessage(res.data.msg);
      }
      return res;
    } catch (err: any) {
      setError(err);
      return err.response.data;
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

      localStorage.setItem('user', JSON.stringify(res.data));
      setIsAuthenticated(true);
      setUser(res.data);
      setError(undefined);
      setIsLoading(false);
      return res.data;
    } catch (err: any) {
      setIsLoading(false);
      return err;
    }
  };

  const login = async ({ email, password }: LoginCredentials) => {
    const body = { email, password };
    setIsLoading(true);

    try {
      const res = await axios.post('/api/auth', body);

      localStorage.setItem('token', res.data.token);

      await fetchUser();
      setError(undefined);

      setIsLoading(false);

      return res.data;
    } catch (err: any) {
      setIsLoading(false);
      return err;
    }
  };

  const updateProfile = async (body: UpdateCredentials) => {
    setIsLoading(true);

    try {
      const res = await axios.put('/api/profile/update', body, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': `${localStorage.getItem('token')}`,
        },
      });

      setError(undefined);
      setIsLoading(false);

      await fetchUser();
      return res.data;
    } catch (err: any) {
      await logout();

      setIsLoading(false);

      return err;
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
        message,
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
