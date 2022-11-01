import { createContext } from "react";

interface AlertContextType {
    spawn: (text: string, yes: () => void) => void;
}
  
export const AlertContext = createContext<AlertContextType>({ spawn: (f) => f });
  
 