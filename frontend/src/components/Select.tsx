import classNames from "classnames";
import { ReactNode, useState } from "react";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDebounce } from "use-debounce";
interface Props {
  defaultId?: any;
  onChange: (value: any) => void;
  placeholder: string;
  values: { id: any; value: string }[];
}

export function Select({
  defaultId,
  onChange,
  placeholder,
  values = [],
}: Props) {
  const [focus, setFocus] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<any>();

  const [open] = useDebounce(focus, 100);

  const handleChange = (id: any) => {
    setCurrentId(id);
    onChange(id);
  };

  return (
    <div className="relative w-full max-w-md  border border-slate-300  rounded-full">
      <button
        className="px-4 py-0.5 w-full flex items-center justify-between text-slate-600"
        onClick={() => setFocus((current) => !current)}
        onBlurCapture={() => setFocus(false)}
      >
        {values.find(({ id }) => id === currentId)?.value ??
          values.find(({ id }) => id === defaultId)?.value ??
          placeholder}
        <FontAwesomeIcon
          className={classNames("transition-transform", {
            "rotate-180": focus,
          })}
          icon={faCaretDown}
        />
      </button>
      <div
        className={classNames(
          "flex-col flex gap-2 w-full absolute right-0 bg-white shadow-md mt-2 rounded-md ",
          {
            "opacity-100": open,
          },
          { "opacity-0 pointer-events-none": !open }
        )}
      >
        {values.map((value) => (
          <button
            className="text-left hover:bg-slate-100 transition-colors px-4 py-2 rounded-md"
            onClick={() => handleChange(value.id)}
          >
            {value.value}
          </button>
        ))}
      </div>
    </div>
  );
}
