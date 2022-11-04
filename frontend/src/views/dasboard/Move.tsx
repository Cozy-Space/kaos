import { faBarcode, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../../components/Button";
import { CodeReader } from "../../components/CodeReader";
import { ContainerList } from "../../components/ContainerList";
import { Search } from "../../components/Search";
import { Select } from "../../components/Select";
import { useContainerApi, useLocationApi } from "../../hooks/ApiHook";
import { Container } from "../../types/Container";

export function Move() {
  const locationApi = useLocationApi();
  const containerApi = useContainerApi();
  const [destinationId, setDestinationId] = useState<any>();
  const [selectedContainers, setSelectedContainers] = useState<number[]>([]);
  const [query, setQuery] = useState<string>("");

  const handleAdd = (id: number) => {
    setSelectedContainers((current) => Array.from(new Set([...current, id])));
    setQuery("");
  };

  const handleMove = () => {
    if (destinationId)
      Promise.all(
        containerApi.data
          .filter((container) => selectedContainers.includes(container.id))
          .map((container) =>
            containerApi.save({ ...container, location: { id: destinationId } })
          )
      ).then(() => containerApi.load());
  };

  const handleAddByCode = (code: string) => {
    const targetContainer = containerApi.data.find(
      (container) => container.code === code
    );
    if (targetContainer) handleAdd(targetContainer.id);
  };

  const handleRemove = (id: number) => {
    setSelectedContainers((current) =>
      current.filter((targetId) => targetId !== id)
    );
    setQuery("");
  };

  const searchContainers = useMemo(
    () =>
      containerApi.data
        .filter((container) => container.name?.includes(query))
        .filter((_, count) => count < 5),
    [containerApi.data, query]
  );

  useEffect(() => {
    locationApi.load();
    containerApi.load();
  }, []);

  return (
    <div className="text-left">
      <h1 className="text-left text-2xl text-slate-700 font-semibold">Move</h1>
      <div className="flex flex-wrap gap-4 py-4 relative">
        <Search onChange={setQuery} value={query} />

        <Select
          values={locationApi.data.map((location) => ({
            id: location.id,
            value: location.name,
          }))}
          placeholder="Select destination"
          onChange={(id) => setDestinationId(id)}
        />
        <CodeReader onScan={handleAddByCode} onFocus={() => setQuery("")} />
        <Button onClick={handleMove} className="bg-slate-200">
          Move <FontAwesomeIcon icon={faTruck} />
        </Button>
      </div>
      {query && (
        <div className="shadow-lg rounded-lg overflow-hidden">
          <ContainerList
            onClick={handleAdd}
            containers={containerApi.data.filter(
              (container) => !selectedContainers.includes(container.id)
            )}
            query={query}
          />
        </div>
      )}

      {selectedContainers.length > 0 && (
        <div className="border border-slate-800 rounded-lg overflow-hidden mt-4">
          <h1 className="font-semibold text-md border-b border-slate-300 py-2  px-2 bg-slate-800 text-white  ">
            Selected
          </h1>
          <ContainerList
            onClick={handleRemove}
            query=""
            containers={containerApi.data.filter((container) =>
              selectedContainers.includes(container.id)
            )}
          />
        </div>
      )}
    </div>
  );
}
