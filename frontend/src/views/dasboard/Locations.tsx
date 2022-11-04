import { useApi, useLocationApi } from "../../hooks/ApiHook";
import { Column, Table, ValuedColumn } from "../../components/Table";
import { useContext, useEffect, useState } from "react";
import { LocationList } from "../../components/LocationList";
import { Filter } from "../../components/Filter";
import { useSearchParams } from "react-router-dom";

const columns: Column[] = [
  {
    name: "id",
    type: "head",
    displayName: "ID",
    immutable: true,
  },
  {
    name: "name",
    type: "text",
    displayName: "Name",
  },
];

export function Locations() {
  const locationsApi = useLocationApi();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    locationsApi.load();
  }, []);

  const [showAdd, setShowAdd] = useState<boolean>(false);

  return (
    <div>
      <h1 className="text-left text-2xl text-slate-700 font-semibold">
        Locations
      </h1>
      <Filter
        onUpdateQuery={(value) => setSearchParams({ query: value })}
        query={searchParams.get("query") || ""}
        addText="Add Location"
        onAddClick={() => setShowAdd(true)}
      />
      <LocationList
        showAdd={showAdd}
        onHideAdd={() => setShowAdd(false)}
        locations={locationsApi.data}
        query={searchParams.get("query") || ""}
      />
    </div>
  );
}
