import axios from "axios";
import { useContext, useState } from "react";
import { ApiContext } from "../context/ApiContext";
import { Container } from "../types/Container";
import { Location } from "../types/Location";

export interface Api<T> {
  data: T[];
  load: () => void;
  save: (row: Partial<T>) => void;
  remove: (row: Partial<T>) => void;
  getById: (id: number) => Promise<any>;
}

export function useApi<T>(endpoint: string): Api<T> {
  const [data, setData] = useState<any[]>([]);

  const load = async () => {
    await axios
      .get(endpoint)
      .then((res) => setData(res.data))
      .catch(() => console.log("cannot get table"));
  };

  const save = async (row: any) => {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    });
  };

  const remove = async (row: any) => {
    await fetch(endpoint, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: row.id }),
    });
  };

  const getById = async (id: number): Promise<any> =>
    fetch(`${endpoint}/${id}`).then((data) => data.json());

  return { data, load, save, remove, getById };
}

export function useLocationApi(): Api<Location> {
  return useContext(ApiContext).locationApi;
}

export function useContainerApi(): Api<Container> {
  return useContext(ApiContext).containerApi;
}
