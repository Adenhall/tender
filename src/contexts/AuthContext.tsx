import React, {
  createContext, ReactNode, useContext, useEffect, useState,
} from 'react';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

import { loginWithUsername } from 'api/auth';

type AuthProviderProps = {
  children: ReactNode;
};

interface IUser {
  _id: string;
  name: string;
  age?: Date;
  pictureUrl?: string;
  bio?: string;
  username: string;
  liked: string[];
  passed: string[];
  match: string[];
  token: string;
}

type AuthContextValues = {
  currentUser: IUser | null;
  login: (username: string, password: string) => Promise<any>;
  setUserDetails: (user: IUser) => void;
};

const AuthContext = createContext<AuthContextValues>({
  currentUser: null,
  login: async () => {},
  setUserDetails: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = token && (jwtDecode(token) as IUser);
    if (user) {
      setCurrentUser(user);
      history.push('/');
    }
  }, []);

  /** Login with username and password.
   * Go to Dashboard if successful and then set the token in localStorage */
  const login = async (username: string, password: string) => {
    const userDetails = await loginWithUsername(username, password);
    localStorage.setItem('token', userDetails?.token);
    setCurrentUser(jwtDecode(userDetails?.token));
    return userDetails;
  };

  const setUserDetails = (user: IUser) => setCurrentUser(user);

  const value = {
    currentUser,
    login,
    setUserDetails,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
