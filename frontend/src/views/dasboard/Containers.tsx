import { Column, Table, ValuedColumn } from "../../components/Table";
import { useContext, useEffect, useRef, useState } from "react";
import { useApi, useContainerApi, useLocationApi } from "../../hooks/ApiHook";
import { text } from "@fortawesome/fontawesome-svg-core";
import { Filter } from "../../components/Filter";
import { ImageUpload } from "../../components/ImageUpload";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

const columns: Column[] = [
  {
    name: "id",
    displayName: "ID",
    type: "head",
    immutable: true,
  },
  {
    name: "name",
    displayName: "Name",
    type: "text",
  },
  {
    name: "code",
    displayName: "Code",
    type: "code",
  },
  {
    name: "tags",
    displayName: "Tags",
    type: "tags",
  },
  {
    name: "imageUrl",
    displayName: "Image",
    type: "image",
  },
  {
    name: "location",
    type: "location",
    displayName: "Location",
  },
];

export function Containers() {
  const containerApi = useContainerApi();
  const locationApi = useLocationApi();

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const table: any = useRef();

  const setAllNames = (location: any) => {
    table.current?.setSomething("location", location);
  };

  const filter = (row: any) => {
    const query = searchParams.get("query");
    return (
      !query ||
      row.name?.includes(query) ||
      row.tags?.includes(query) ||
      row.code?.includes(query) ||
      row.location?.name.includes(query)
    );
  };

  const handleCodeScan = (code: string) => {
    table.current?.selectCode(code);
  };

  useEffect(() => {
    containerApi.load();
    locationApi.load();
  }, []);

  return (
    <div>
      <Filter
        onUpdateQuery={(value) => setSearchParams({ query: value })}
        query={searchParams.get("query") || ""}
        onSetLocation={setAllNames}
        onCodeScan={handleCodeScan}
      />
      <Table
        onOpen={(id) => navigate("/dashboard/containers/" + id)}
        ref={table}
        api={containerApi}
        columns={columns}
        filter={filter}
      />
    </div>
  );
}
