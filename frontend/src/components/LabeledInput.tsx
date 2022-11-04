import classNames from "classnames";
import { useState } from "react";

interface LabeledInputProps {
  label: string;
  type: string;
  name: string;
}

export function LabeledInput({ label, type, name }: LabeledInputProps) {
  const [value, setValue] = useState<string>("");
  const [focus, setFocus] = useState<boolean>(false);

  const active = !!value || focus;

  return (
    <div className="relative">
      <div
        className={classNames(
          "absolute left-3 pointer-events-none transition-all text-slate-500 ",
          { "top-2.5 text-md ": !active },
          { "top-1 text-xs ": active }
        )}
      >
        {label}
      </div>
      <input
        className="pb-1 pt-4 w-full px-3 border border-slate-400 rounded-lg"
        name={name}
        type={type}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
}
