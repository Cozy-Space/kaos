import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { Filter } from "../../components/Filter";
import { SmartListItem } from "../../components/SmartListItem";
import { useSmartList } from "../../hooks/SmartListHook";
import { SmartList } from "../../types/SmartList";

export function SmartLists() {
  const [lists, setLists] = useState<SmartList[]>([]);
  const smartListApi = useSmartList();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const load = async () => {
    setLists(await smartListApi.findAll());
  };

  const handleCreate = async () => {
    await smartListApi.create();
    load();
  };

  const handleOpen = async (id: number) => {
    navigate(`/dashboard/smartlists/${id}`);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="flex-1 ">
      <h1 className="text-left text-2xl text-slate-700 font-semibold">
        Smart Lists
      </h1>
      <Filter
        onUpdateQuery={(value) => setSearchParams({ query: value })}
        query={searchParams.get("query") || ""}
        addText="Add Smart List"
        onAddClick={handleCreate}
      />
      {lists
        .filter((list) => list.name.includes(searchParams.get("query") || ""))
        .map((list) => (
          <SmartListItem onClick={handleOpen} smartList={list} />
        ))}
    </div>
  );
}
