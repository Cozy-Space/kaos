import { Api } from "../hooks/ApiHook";
import { TableRow } from "./TableRow";
import { TableHead } from "./TableHead";
import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";

export interface Column {
  name: string;
  displayName: string;
  type: string;
  immutable?: boolean;
}

export interface ValuedColumn {
  name: string;
  displayName: string;
  type: string;
  immutable?: boolean;
  value: any;
}

interface TableProps {
  api: Api;
  columns: Column[];
  filter?: (row: any) => boolean;
}

export const Table = forwardRef(
  ({ api, columns, filter = () => true }: TableProps, ref) => {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const handleUpdate = async (updatedRow: any) => {
      await api.save(updatedRow);
      await api.load();
    };

    const handleSelect = (id: number, checked: boolean) => {
      if (!checked)
        return setSelectedIds((ids) => ids.filter((i: number) => i !== id));

      setSelectedIds((ids) => Array.from(new Set([...ids, id])));
    };

    const getRows = (): any[] =>
      api.data
        .filter((row) => filter(row))
        .sort(
          (a: any, b: any) =>
            (selectedIds.includes(b.id) ? 1 : 0) -
            (selectedIds.includes(a.id) ? 1 : 0)
        );

    const handleDelete = async (deletedRow: any) => {
      await api.remove(deletedRow);
      api.load();
    };

    useImperativeHandle(ref, () => ({
      setSomething: async (name: string, value: any) => {
        for (let row of getRows().filter((row) =>
          selectedIds.includes(row.id)
        )) {
          await api.save({ ...row, [name]: value });
        }
        api.load();
      },
      selectCode: async (code: string) => {
        getRows()
          .filter((row) => row.code === code)
          .forEach((row) => {
            handleSelect(row.id, true);
          });
      },
    }));

    return (
      <div className="border border-slate-200 rounded-xl overflow-x-auto w-full">
        <table className="w-full table-auto text-left border-collapse rounded-xl overflow-hidden">
          <TableHead columns={columns} />
          <tbody>
            {getRows().map((row: any, key: number) => (
              <TableRow
                onSelectChange={handleSelect}
                selected={selectedIds.includes(row.id)}
                key={row.id || -1}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                row={row}
                columns={columns}
              />
            ))}
            <TableRow
              key={-1}
              onSelectChange={handleSelect}
              onUpdate={handleUpdate}
              columns={columns}
            />
          </tbody>
        </table>
      </div>
    );
  }
);
