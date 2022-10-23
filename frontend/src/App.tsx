import "./App.css";
import { Head } from "./components/Head";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Containers } from "./views/Containers";
import { Welcome } from "./views/Welcome";
import { Locations } from "./views/Locations";
import { Context, createContext, useContext, useEffect, useState } from "react";
import { useApi } from "./hooks/ApiHook";
import { Login } from "./views/Login";
import { CreateAccount } from "./views/CreateAccount";
import { useLogin } from "./hooks/LoginHook";

export const ApiContext: Context<any> = createContext({} as any);

function App() {
  const locationApi = useApi("/api/location");
  const containerApi = useApi("/api/container");
  const loginApi = useLogin();

  const navigate = useNavigate();
  const location = useLocation();

  const navigateOnce = (path: string) => {
    if (location.pathname !== path) navigate(path);
  };

  useEffect(() => {
    if (loginApi.isInit) return navigateOnce("/create");
    if (!loginApi.isAuthenticated) return navigateOnce("/login");
  }, [location, loginApi]);

  return (
    <div className="App">
      <ApiContext.Provider value={{ locationApi, containerApi, loginApi }}>
        <Head />
        <Routes>
          <Route path="containers" element={<Containers />} />
          <Route path="locations" element={<Locations />} />
          <Route path="login" element={<Login />} />
          <Route path="create" element={<CreateAccount />} />
          <Route path="" element={<Welcome />} />
        </Routes>
      </ApiContext.Provider>
    </div>
  );
}

export default App;
