import "./App.css";
import { Head } from "./components/Head";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Containers } from "./views/dasboard/Containers";
import { Welcome } from "./views/Welcome";
import { Locations } from "./views/dasboard/Locations";
import { Context, createContext, useContext, useEffect, useState } from "react";
import { useApi } from "./hooks/ApiHook";
import { Login } from "./views/Login";
import { AuthenticationProvider } from "./hooks/LoginHook";
import { Dashboard } from "./views/Dasboard";

export const ApiContext: Context<any> = createContext({} as any);

function App() {
  const locationApi = useApi("/api/location");
  const containerApi = useApi("/api/container");

  return (
    <div className="App">
      <AuthenticationProvider>
        <ApiContext.Provider value={{ locationApi, containerApi }}>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="dashboard/*" element={<Dashboard />} />
          </Routes>
        </ApiContext.Provider>
      </AuthenticationProvider>
    </div>
  );
}

export default App;
