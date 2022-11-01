import "./App.css";
import {
  Route,
  Routes,
} from "react-router-dom";
import { Login } from "./views/Login";
import { Dashboard } from "./views/Dasboard";
import { Code } from "./views/Code";
import { AlertProvider } from "./provider/AlertProvider";
import { ApiProvider } from "./provider/ApiProvider";
import { AuthenticationProvider } from "./provider/LoginProvider";


function App() {
  return (
    <div className="App">
      <AlertProvider>
        <AuthenticationProvider>
          <ApiProvider>
            <Routes>
            <Route path="login" element={<Login />} />
              <Route path="code/:code" element={<Code />} />
              <Route path="dashboard/*" element={<Dashboard />} />
            </Routes>
            </ApiProvider>
        </AuthenticationProvider>
      </AlertProvider>
    </div>
  );
}

export default App;
