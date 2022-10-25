import { useApi, useLocationApi } from "../../hooks/ApiHook";
import { Column, Table, ValuedColumn } from "../../components/Table";
import { useContext, useEffect } from "react";
import { ApiContext } from "../../App";

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

  useEffect(() => {
    locationsApi.load();
  }, []);

  return (
    <div>
      <Table api={locationsApi} columns={columns} />
    </div>
  );
}
