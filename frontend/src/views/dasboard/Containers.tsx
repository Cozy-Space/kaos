import { useContext, useEffect, useRef, useState } from "react";
import { useApi, useContainerApi, useLocationApi } from "../../hooks/ApiHook";
import { text } from "@fortawesome/fontawesome-svg-core";
import { Filter } from "../../components/Filter";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ContainerList } from "../../components/ContainerList";

export function Containers() {
  const containerApi = useContainerApi();
  const locationApi = useLocationApi();

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const table: any = useRef();

  const setAllNames = (location: any) => {
    table.current?.setSomething("location", location);
  };

  const handleCodeScan = (code: string) => {
    table.current?.selectCode(code);
  };

  useEffect(() => {
    containerApi.load();
    locationApi.load();
  }, []);

  return (
    <div className="flex-1 p-4">
      <Filter
        onUpdateQuery={(value) => setSearchParams({ query: value })}
        query={searchParams.get("query") || ""}
        onSetLocation={setAllNames}
        onCodeScan={handleCodeScan}
      />
      <ContainerList
        containers={containerApi.data}
        query={searchParams.get("query") || ""}
      />
    </div>
  );
}
