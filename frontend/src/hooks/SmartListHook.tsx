import { SmartList } from "../types/SmartList";

export function useSmartList() {
  const findAll = () => fetch("/api/smartlist").then((data) => data.json());

  const create = () =>
    fetch("/api/smartlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

  const remove = (smartList: Partial<SmartList>) =>
    fetch("/api/smartlist", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(smartList),
    });

  const update = (smartList: Partial<SmartList>) =>
    fetch("/api/smartlist", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(smartList),
    });

  const findById = (id: number) =>
    fetch(`/api/smartlist/${id}`).then((data) => data.json());

  const getContainers = (id: number) =>
    fetch(`/api/smartlist/${id}/containers`).then((data) => data.json());

  return { findAll, create, findById, remove, update, getContainers };
}
