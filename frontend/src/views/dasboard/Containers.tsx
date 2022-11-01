import { Column, Table, ValuedColumn } from "../../components/Table";
import { useContext, useEffect, useRef, useState } from "react";
import { useApi, useContainerApi, useLocationApi } from "../../hooks/ApiHook";
import { text } from "@fortawesome/fontawesome-svg-core";
import { Filter } from "../../components/Filter";
import { ImageUpload } from "../../components/ImageUpload";
import { useLocation, useParams } from "react-router-dom";

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

  const [query, setQuery] = useState("");

  const location = useLocation();

  const table: any = useRef();

  const setAllNames = (location: any) => {
    table.current?.setSomething("location", location);
  };

  const filter = (row: any) =>
    !query ||
    row.name?.includes(query) ||
    row.tags?.includes(query) ||
    row.code?.includes(query) ||
    row.location?.name.includes(query);

  const handleCodeScan = (code: string) => {
    table.current?.selectCode(code);
  };

  useEffect(() => {
    containerApi.load();
    locationApi.load();
  }, []);

  useEffect(() => {
    const q = location.search
      .replace("?", "")
      .split("&")
      .map((p) => p.split("="))
      .find(([key]) => key === "q")?.[1];

    if (q) setQuery(q);
  }, [location]);

  return (
    <div>
      {/*<input className={'bg-slate-200 p-4 mb-2 rounded-full'} value={query} onChange={(event) => setQuery(event.currentTarget.value)} />*/}
      {/*<button className={'relative bg-slate-600 text-white px-4 py-2 rounded-3xl hover:bg-slate-700 hover:rounded-md active:bg-slate-800 active:top-0.5  focus:outline-none transition-all'} onClick={setAllNames}>SetAllNames</button>*/}

      <Filter
        onUpdateQuery={setQuery}
        query={query}
        onSetLocation={setAllNames}
        onCodeScan={handleCodeScan}
      />
      <Table ref={table} api={containerApi} columns={columns} filter={filter} />
    </div>
  );
}
