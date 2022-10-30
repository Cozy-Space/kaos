import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AlertProps {
  text: string;
  onYes: () => void;
  onClose: () => void;
}

export function Alert({ text, onYes, onClose }: AlertProps) {
  const handleYes = () => {
    onYes();
    onClose();
  };

  return (
    <>
      <div
        onClick={onClose}
        className="h-full w-full bg-slate-900 opacity-25 fixed top-0 left-0"
      ></div>
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center bg-white px-10 py-4 w-full max-w-md rounded-lg">
        <div className="p-4 pb-6">{text}</div>
        <div className="flex justify-between   gap-4">
          <button
            onClick={onClose}
            className="bg-red-400 px-8 py-2 rounded-md text-white flex-grow"
          >
            No
          </button>
          <button
            onClick={handleYes}
            className="bg-slate-400 px-8 py-2 rounded-md  text-white flex-grow"
          >
            Yes
          </button>
        </div>
      </div>
    </>
  );
}

interface AlertContextType {
  spawn: (text: string, yes: () => void) => void;
}

const AlertContext = createContext<AlertContextType>({ spawn: (f) => f });

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

export function useAlert() {
  const context = useContext(AlertContext);
  return context.spawn;
}
