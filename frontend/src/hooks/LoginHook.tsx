import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

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

const AuthenticationContext = createContext<AuthenticationApiType>({
  login: (f) => {},
  me: null,
  logout: () => {},
  loggingIn: false,
  loginFailed: false,
  changingPassword: false,
  passwordChangeFailed: false,
  changePassword: (f) => f,
});

interface AuthenticationProviderProps {
  children: ReactNode | ReactNode[];
}

type ApiState = "PREPARING" | "AUTHENTICATED" | "NOT_AUTHENTICATED";

export const AuthenticationProvider = ({
  children,
}: AuthenticationProviderProps) => {
  const [me, setMe] = useState<{ name: string; id: number } | null>(null);
  const [status, setStatus] = useState<ApiState>("PREPARING");
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const [changingPassword, setChangingPassword] = useState<boolean>(false);
  const [passwordChangeFailed, setPasswordChangeFailed] =
    useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const navigateOnce = (path: string) => {
    if (location.pathname !== path) navigate(path);
  };

  const login = async (name: string, password: string) => {
    setLoggingIn(true);
    await axios
      .post("/api/login", { name, password })
      .then(() => setLoginFailed(false))
      .catch(() => setLoginFailed(true))
      .finally(() => {
        setLoggingIn(false);
      });
    fetchMe();
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    setChangingPassword(true);
    await axios
      .put("/api/login", { oldPassword, newPassword })
      .then(() => {
        setPasswordChangeFailed(false), logout();
      })
      .catch(() => setPasswordChangeFailed(true))
      .finally(() => setChangingPassword(false));
  };

  const logout = async () => {
    await axios.get("/api/login/logout");
    fetchMe();
  };

  const fetchMe = () => {
    axios
      .get("/api/login/me")
      .then((res) => {
        setMe(res.data);
        setStatus("AUTHENTICATED");
      })
      .catch(() => {
        setMe(null);
        setStatus("NOT_AUTHENTICATED");
      });
  };

  useEffect(() => {
    fetchMe();
  }, [location]);

  useEffect(() => {
    if (status === "NOT_AUTHENTICATED") {
      navigateOnce("/login");
      return;
    }

    if (status === "AUTHENTICATED" && location.pathname === "/login") {
      navigateOnce("/dashboard/containers");
      return;
    }
  }, [status, location]);

  return (
    <AuthenticationContext.Provider
      value={{
        me,
        login,
        logout,
        loggingIn,
        loginFailed,
        changePassword,
        changingPassword,
        passwordChangeFailed,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export function useLogin() {
  return useContext(AuthenticationContext);
}
