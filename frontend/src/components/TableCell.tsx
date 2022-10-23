import { useLocationApi } from "../hooks/ApiHook";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import { ImageUpload } from "./ImageUpload";
import { Tag } from "./Tag";

interface TableCellProps {
  type: string;
  value: any;
  editable?: boolean;
  update?: (value: any) => void;
}

export function TableCell({
  type,
  editable = true,
  value,
  update = () => {},
}: TableCellProps) {
  const locationApi = useLocationApi();

  if (type === "head") return <th className={"p-4 py-2"}>{value}</th>;

  if (["text", "number"].includes(type))
    return (
      <td className={"p-4 py-2"}>
        <input
          type={type}
          value={value || ""}
          onChange={(event) => update(event.currentTarget.value)}
        />
      </td>
    );

  if (type === "tags") {
    const [editing, setEditing] = useState(false);
    const inputRef = createRef<HTMLInputElement>();

    const tags = useMemo(() => {
      if (!value) return ["no tags"];
      return value?.split(",").map((tag: string) => tag.trim());
    }, [value]);

    console.log(tags);

    useEffect(() => {
      if (editing) inputRef.current?.focus();
    }, [editing]);

    if (!editing)
      return (
        <td className={"p-4 py-0 max-w-xs w-full overflow-x-auto"}>
          <button className="flex  py-3 gap-1" onFocus={() => setEditing(true)}>
            {tags.map((tag: string) => (
              <Tag key={tag} text={tag} />
            ))}
          </button>
        </td>
      );
    return (
      <td className="p-4 py-2 max-w-xs w-full overflow-x-auto">
        <input
          className="w-full"
          ref={inputRef}
          type="text"
          value={value || ""}
          onBlur={() => setEditing(false)}
          onChange={(event) => update(event.currentTarget.value)}
        />
      </td>
    );
  }

  if (type === "id")
    return (
      <td className={"p-4 py-2"}>
        <label>{value}</label>
      </td>
    );

  if (type === "location")
    return (
      <td className={"p-4 py-2"}>
        <select
          value={value?.id || ""}
          onChange={(event) =>
            update({ id: event.currentTarget.value || null })
          }
        >
          <option></option>
          {locationApi.data.map((location: any) => (
            <option value={location.id} key={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </td>
    );
  if (type === "image") {
    return (
      <td className={"p-4 py-2"}>
        <ImageUpload onChange={update} value={value} />
      </td>
    );
  }

  if (type === "code") {
    const [code, setCode] = useState("");
    const [inEditing, setInEditing] = useState(false);
    const input: any = useRef();

    useEffect(() => {
      setCode(value || "");
    }, [value]);

    useEffect(() => {
      if (inEditing) {
        input?.current?.focus();
        input?.current?.select();
      }
    }, [inEditing]);

    const handleCodeUpdate = (event: any) => {
      const key = event.key;
      if (["Tab", "Enter"].includes(key)) {
        setInEditing(false);
        update(code);
      }
    };

    return (
      <td className={"p-4 py-2"}>
        {inEditing ? (
          <input
            onBlur={() => {
              setInEditing(false);
              update(code);
            }}
            ref={input}
            className={
              "w-40 z-10 px-4 py-1 text-white border border-slate-400 bg-transparent rounded-full focus:bg-slate-300"
            }
            onKeyDown={handleCodeUpdate}
            onChange={(e) => setCode(e.currentTarget.value)}
            value={code}
          />
        ) : (
          <button
            onClick={() => setInEditing(true)}
            onFocus={() => setInEditing(true)}
            className={
              "w-40 h-8 z-10 px-4 py-1 text-slate-900 border border-slate-400 bg-transparent rounded-full overflow-hidden"
            }
          >
            {code}
          </button>
        )}
      </td>
    );
  }

  return (
    <td className={"px-4 py-2"}>
      <input
        className="focus:outline-none bg-transparent"
        disabled={!editable}
        value={value}
        onBlur={(event) => update(event.currentTarget.value)}
        type={type}
      />
    </td>
  );
}
