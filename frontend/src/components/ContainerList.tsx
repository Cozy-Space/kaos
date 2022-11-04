import { useMemo } from "react";
import { Container } from "../types/Container";
import { ContainerListItem } from "./ContainerListItem";

interface Props {
  containers: Container[];
  query: string;
}

export function ContainerList({ containers, query = "" }: Props) {
  const shownContainers = useMemo(
    () =>
      containers.filter(
        (container) =>
          !query ||
          container.name?.includes(query) ||
          container.tags?.includes(query) ||
          container.code?.includes(query) ||
          container.location?.name.includes(query)
      ),
    [query, containers]
  );

  return (
    <div className="flex flex-col">
      {shownContainers.map((container) => (
        <ContainerListItem container={container} />
      ))}
    </div>
  );
}
