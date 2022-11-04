import { createRef, useEffect, useState } from "react";
import { Tag } from "./Tag";

interface Props {
  defaultValue: string | undefined;
  onChange?: (value: string) => void;
  editable?: boolean;
}

export function TagInput({
  defaultValue,
  onChange = () => {},
  editable = false,
}: Props) {
  const [inEditing, setInEditing] = useState<boolean>(false);

  const input = createRef<HTMLInputElement>();

  useEffect(() => {
    if (inEditing) input.current?.focus();
  }, [inEditing]);

  if (inEditing)
    return (
      <input
        ref={input}
        onBlur={() => setInEditing(false)}
        type="text"
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    );

  return (
    <div
      className="flex flex-wrap gap-2"
      onClick={() => setInEditing(true && editable)}
    >
      {defaultValue
        ? defaultValue?.split(",").map((tag) => <Tag text={tag} />)
        : "no tags"}
    </div>
  );
}
