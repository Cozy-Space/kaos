import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SearchProps {
  value: string;
  onChange: (query: string) => void;
}

export function Search({ value, onChange }: SearchProps) {
  return (
    <div
      className={
        "h-8 grow flex flex-row justify-center items-center border border-slate-300 gap-2 px-3 rounded-full"
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
