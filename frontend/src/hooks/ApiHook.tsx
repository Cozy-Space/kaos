import axios from "axios";
import { useContext, useState } from "react";
import { ApiContext } from "../context/ApiContext";

export interface Api {
  data: any[];
  load: () => void;
  save: (row: any) => void;
  remove: (row: any) => void;
  getById: (id: number) => Promise<any>
}

export function useApi(endpoint: string): Api {
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
  }

    const getById = async (id: number): Promise<any> => fetch(`${endpoint}/${id}`)
      .then(data => data.json())
    

  return { data, load, save, remove, getById };
}

export function useLocationApi(): Api {
  return useContext(ApiContext).locationApi;
}

export function useContainerApi(): Api {
  return useContext(ApiContext).containerApi;
}
