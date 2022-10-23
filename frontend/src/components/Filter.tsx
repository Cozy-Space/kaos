import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faXmark,
  faBarcode,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useLocationApi } from "../hooks/ApiHook";

interface FilterProps {
  onUpdateQuery: (query: string) => void;
  onSetLocation: (location: any) => void;
  onCodeScan: (code: string) => void;
}

export function Filter({
  onUpdateQuery = (f) => f,
  onSetLocation = (f) => f,
  onCodeScan = (f) => f,
}: FilterProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    onUpdateQuery(query);
  }, [query]);

  return (
    <div className={"flex my-4 gap-2 flex-col md:flex-row"}>
      <Search value={query} onChange={setQuery} />
      <SetLocation onSet={onSetLocation} />
      <Select onFocus={() => setQuery("")} onScan={onCodeScan} />
    </div>
  );
}

interface SearchProps {
  value: string;
  onChange: (query: string) => void;
}

function Search({ value, onChange }: SearchProps) {
  return (
    <div
      className={
        "h-8 grow flex flex-row justify-center items-center border border-slate-200 rounded-full gap-2 px-3"
      }
    >
      {value ? (
        <FontAwesomeIcon
          onClick={() => onChange("")}
          className={"text-slate-400"}
          icon={faXmark}
        />
      ) : (
        <FontAwesomeIcon className={"text-slate-400"} icon={faSearch} />
      )}
      <input
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
        type="text"
        className={
          "text-slate-600 grow h-full bg-transparent focus:outline-none"
        }
      />
    </div>
  );
}

interface SelectProps {
  onScan: (data: string) => void;
  onFocus: () => void;
}

function Select({ onScan, onFocus }: SelectProps) {
  const [listening, setListening] = useState(false);
  const [code, setCode] = useState("");

  const handleActive = () => {
    setListening(true);
    onFocus();
  };

  const handleKeyDown = (event: any) => {
    const key = event.key;

    if (["Enter", "Tab"].includes(key)) {
      onScan(code);
      setCode("");
      return;
    }

    setCode(code + key);
  };

  return (
    <button
      onBlur={() => setListening(false)}
      onFocus={handleActive}
      onKeyDown={handleKeyDown}
      className={classNames(
        "h-8 justify-center flex items-center gap-2 px-3 rounded-full transition-colors",
        { "bg-slate-900 text-white": listening },
        { "bg-slate-200": !listening }
      )}
    >
      QR Code Scanner
      {listening ? (
        <FontAwesomeIcon icon={faSpinner} className={"w-4 animate-spin"} />
      ) : (
        <FontAwesomeIcon icon={faBarcode} className={"w-4"} />
      )}
    </button>
  );
}

interface SetLocationProps {
  onSet: (location: any) => void;
}

function SetLocation({ onSet }: SetLocationProps) {
  const locationApi = useLocationApi();
  const [location, setLocation] = useState<any>();

  const handleSet = () => {
    onSet(location);
    setLocation(null);
  };

  return (
    <div className="h-8 flex items-center gap-2 px-3 rounded-full transition-colors bg-slate-200">
      <select
        className="bg-transparent w-full"
        onChange={(e) => setLocation({ id: e.currentTarget.value })}
        value={location?.id || ""}
      >
        <option value=""></option>
        {locationApi.data.map((location: any) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>
      <button onClick={handleSet}>Set</button>
    </div>
  );
}
