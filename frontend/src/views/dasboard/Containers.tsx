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

  const handleAdd = () => {
    navigate("/dashboard/containers/new");
  };

  useEffect(() => {
    containerApi.load();
    locationApi.load();
  }, []);

  return (
    <div className="flex-1 ">
      <h1 className="text-left text-2xl text-slate-700 font-semibold">
        Container
      </h1>
      <Filter
        onUpdateQuery={(value) => setSearchParams({ query: value })}
        query={searchParams.get("query") || ""}
        addText="Add Container"
        onAddClick={handleAdd}
      />
      <ContainerList
        onClick={(id) => navigate("/dashboard/containers/" + id)}
        containers={containerApi.data}
        query={searchParams.get("query") || ""}
      />
    </div>
  );
}
