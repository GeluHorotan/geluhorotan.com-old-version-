import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

import { useAlert } from '@/context/hooks/useAlert';
import Role from '@/utils/roles';

type Props = {
  children: React.ReactNode;
};

type Callbacks = {
  onAuthSuccess: () => void;
};

type Error = {
  response: {
    data: {
      errors: Array<{ msg: string }>;
    };
  };
};

type User = {
  avatar?: string;
  email: string;
  firstName: string;
  lastName: string;
  verified: boolean;
  _id: string;
  __v: number;
  profilePicture: string;
};

type State = {
  isLoading: boolean;
  isAuthenticated: boolean | undefined;
  user?: User;
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
  fetchAllUsers: (role: number) => Promise<Error | undefined>;
  logout: () => Promise<void>;

  setCallbacks: React.Dispatch<React.SetStateAction<Callbacks | undefined>>;
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
      localStorage.setItem('token', JSON.stringify(res.data.token));

      setError(undefined);
      setIsAuthenticated(false);
      setIsLoading(false);
      updateAlert(alertId, 'Register succesfully!', true);
      return res.data;
    } catch (err: any) {
      setIsLoading(false);
      err.response.data.errors.map((error: { msg: string }) => {
        return updateAlert(alertId, error.msg, false);
      });

      return err;
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

  const fetchAllUsers = async (role = Role.User) => {
    try {
      const res = await axios.get(`/api/users?filterByRole=${role}`, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': `${localStorage.getItem('token')}`,
        },
      });

      return res.data;
    } catch (err) {
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
        setError,
        login,
        logout,
        register,
        updateProfile,
        fetchUser,
        fetchAllUsers,
        setCallbacks,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};