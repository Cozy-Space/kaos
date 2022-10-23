import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../App";

export function useLogin() {
  const [isInit, setIsInit] = useState<boolean>();
  const [username, setUsername] = useState<string>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const [error, setError] = useState<string>();

  const login = (name: string, password: string) => {
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        password,
      }),
    })
      .then((data) => data.json())
      .then(({ success }) => setIsAuthenticated(success))
      .catch(setError);
  };

  const create = (name: string, password: string) => {
    fetch("/api/login/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        password,
      }),
    })
      .then((data) => data.json())
      .then(({ success }) => setIsAuthenticated(success))
      .catch(setError)
      .then(loadInit);
  };

  const loadInit = () => {
    fetch("/api/login/status")
      .then((data) => data.json())
      .then(({ status }) => setIsInit(!status))
      .catch(setError);
  };

  useEffect(loadInit, []);

  return { isInit, username, isAuthenticated, error, login, create };
}

export function useLoginApi() {
  return useContext(ApiContext).loginApi;
}
