import { useContext, useEffect, useRef, useState } from "react";
import { useApi, useContainerApi, useLocationApi } from "../../hooks/ApiHook";
import { text } from "@fortawesome/fontawesome-svg-core";
import { Filter } from "../../components/Filter";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ContainerList } from "../../components/ContainerList";
import { TagBrush } from "../../components/TagBrush";
import { useTagBrush } from "../../hooks/TagBrushHook";

export function Containers() {
  const containerApi = useContainerApi();
  const locationApi = useLocationApi();
  const tagBrush = useTagBrush();
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/dashboard/containers/new");
  };

  const handleClick = (id: number) => {
    if (!tagBrush.active) {
      navigate("/dashboard/containers/" + id);
    } else {
      const c = containerApi.data.find((container) => container.id === id);
      if (!c) return;
      if (!c.tags) return;
      if (!tagBrush.tag) return;
      const t = c.tags.includes(tagBrush.tag)
        ? c.tags
            .split(",")
            .filter((tag) => tag !== tagBrush.tag)
            .join(",")
        : `${c.tags},${tagBrush.tag}`;
      containerApi.update({ id, tags: t });
    }
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
      >
        <TagBrush />
      </Filter>
      <ContainerList
        onClick={handleClick}
        containers={containerApi.data}
        query={searchParams.get("query") || ""}
      />
    </div>
  );
}
