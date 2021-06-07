import React, {
  createContext, ReactNode, useContext, useEffect, useState,
} from 'react';
import jwtDecode from 'jwt-decode';

type AuthProviderProps = {
  children: ReactNode;
};

interface IUser {
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
  login(username: string, password: string): void;
};

const AuthContext = createContext<AuthContextValues | null>(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = token && (jwtDecode(token) as IUser);
    if (user) setCurrentUser(user);
  });

  /** Login with username and password and then set the token in localStorage */
  const login = (username: string, password: string) => {

  };

  const value = {
    currentUser,
    login,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
