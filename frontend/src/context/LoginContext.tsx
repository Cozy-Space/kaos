import { createContext } from "react";

interface AuthenticationApiType {
    login: (name: string, password: string) => void;
    me: { name: string; id: number } | null;
    logout: () => void;
    changePassword: (oldPassword: string, newPassword: string) => void;
    changingPassword: boolean;
    passwordChangeFailed: boolean;
    loggingIn: boolean;
    loginFailed: boolean;
  }
  
 export const AuthenticationContext = createContext<AuthenticationApiType>({
    login: (f) => {},
    me: null,
    logout: () => {},
    loggingIn: false,
    loginFailed: false,
    changingPassword: false,
    passwordChangeFailed: false,
    changePassword: (f) => f,
  });