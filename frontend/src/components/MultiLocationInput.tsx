import { useMemo } from "react";
import { Location } from "./../types/Location";
import { Select } from "./Select";

interface Props {
  onChange: (value: number[]) => void;
  value: number[];
  locations: Location[];
}

export function MultiLocationInput({ onChange, value, locations }: Props) {
  const handleRemove = (id: number) => {
    onChange(value.filter((tid) => tid !== id));
  };

  const handleAdd = (id: number) => {
    onChange(Array.from(new Set([...value, id])));
  };

  const locationTags = useMemo(() => {
    if (!locations) return [];
    return value.map((id) => locations.find((l) => l.id === id));
  }, [value, locations]);

  return (
    <div className="flex items-center gap-4">
      {locationTags.map(
        (l) => !!l && <LocationTag onRemove={handleRemove} location={l} />
      )}
      <Select
        onChange={handleAdd}
        defaultId={0}
        placeholder="Select Location"
        values={locations
          .map((l) => ({ id: l.id, value: l.name }))
          .filter((l) => !value.includes(l.id))}
      />
    </div>
  );
}

interface LocationTagProps {
  location: Location;
  onRemove: (id: number) => void;
}

function LocationTag({ location, onRemove }: LocationTagProps) {
  return (
    <div className="inline-block" onClick={() => onRemove(location.id)}>
      {location.name}
    </div>
  );
}
