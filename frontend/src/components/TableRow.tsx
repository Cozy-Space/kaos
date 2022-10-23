import { ReactNode, useEffect, useRef, useState } from "react";
import { Column, ValuedColumn } from "./Table";
import { faTrash, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableCell } from "./TableCell";
import { Checkbox } from "./Checkbox";

interface TableRowProps {
  row?: any;
  columns: Column[];
  onUpdate?: (row: any) => void;
  onDelete?: (row: any) => void;
  onSelectChange?: (id: number, checked: boolean) => void;
  selected?: boolean;
}

export function TableRow({
  row,
  columns,
  onUpdate = () => {},
  onDelete = () => {},
  onSelectChange = () => {},
  selected = false,
}: TableRowProps) {
  const [saveObject, setSaveObject] = useState<any>();

  useEffect(() => {
    setSaveObject(row);
  }, [row]);

  const handleChange = (value: any, column: string) => {
    const update = { ...saveObject, [column]: value };
    setSaveObject(update);
    if (!!row) onUpdate(update);
  };

  return (
    <tr className={"border-b border-slate-200 last:border-b-0"}>
      <td className={"pl-4"}>
        {!!row && (
          <Checkbox
            value={selected}
            onChange={(checked: boolean) => onSelectChange(row.id, checked)}
          />
        )}
      </td>
      {columns.map((column: Column, key: number) => (
        <TableCell
          key={key}
          type={column.type}
          value={saveObject?.[column.name]}
          update={(value) => handleChange(value, column.name)}
          editable={!column.immutable}
        />
      ))}
      <td
        className={"p-4 py-2 hover:text-slate-900 text-slate-600 items-center"}
      >
        {!!row ? (
          <FontAwesomeIcon onClick={() => onDelete(row)} icon={faTrash} />
        ) : (
          <FontAwesomeIcon
            onClick={() => {
              console.log("save", saveObject);
              onUpdate(saveObject);
              setSaveObject(row);
            }}
            icon={faSave}
          />
        )}
      </td>
    </tr>
  );
}
