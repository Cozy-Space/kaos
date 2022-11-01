import {
  useContext,
} from "react";
import { AuthenticationContext } from "../context/LoginContext";

export function useLogin() {
  return useContext(AuthenticationContext);
}
