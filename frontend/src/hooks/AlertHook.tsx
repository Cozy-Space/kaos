import { useContext } from "react";
import { AlertContext } from "../context/AlertContext";

export function useAlert() {
    const context = useContext(AlertContext);
    return context.spawn;
  }