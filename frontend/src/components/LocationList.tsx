import { Container } from "../types/Container";
import { ContainerListItem } from "./ContainerListItem";
import { LocationListItem } from "./LocationListItem";
import { Location } from "../types/Location";
import { useMemo } from "react";
interface Props {
  locations: Location[];
  showAdd: boolean;
  onHideAdd: () => void;
  query: string;
}

export function LocationList({
  locations,
  showAdd,
  onHideAdd,
  query = "",
}: Props) {
  const shownLocations = useMemo(
    () =>
      locations.filter(
        (container) => !query || container.name?.includes(query)
      ),
    [query, locations]
  );

  return (
    <div className="flex flex-col">
      {showAdd && (
        <LocationListItem
          key={-1}
          onBlur={onHideAdd}
          location={{ name: "", containerCount: 0 }}
        />
      )}
      {shownLocations.map((location) => (
        <LocationListItem key={location.id} location={location} />
      ))}
    </div>
  );
}
