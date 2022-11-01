import { ReactNode, useState } from "react";
import { Alert } from "../components/Alert";
import { AlertContext } from "../context/AlertContext";

interface AlertProviderProps {
    children: ReactNode | ReactNode[];
  }

export function AlertProvider({ children }: AlertProviderProps) {
    let id = 0;
    const [alerts, setAlerts] = useState<any>([]);
    const spawn = (text: string, yes: () => void) => {
      setAlerts((current: any) => [...current, { text, yes, id }]);
      id++;
    };
  
    const del = (id: number) => {
      setAlerts((current: any) =>
        current.filter((alert: any) => alert.id !== id)
      );
    };
  
    return (
      <AlertContext.Provider value={{ spawn }}>
        {alerts.map((alert: any) => (
          <Alert
            key={alert.id}
            text={alert.text}
            onYes={alert.yes}
            onClose={() => del(alert.id)}
          />
        ))}
        {children}
      </AlertContext.Provider>
    );
  }