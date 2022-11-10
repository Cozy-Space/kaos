import { listenerCancelled } from "@reduxjs/toolkit/dist/listenerMiddleware/exceptions";
import classNames from "classnames";
import { SmartList } from "../types/SmartList";

interface Props {
  smartList: SmartList;
  onClick?: (id: number) => void;
}

export function SmartListItem({ smartList, onClick = () => {} }: Props) {
  return (
    <div
      className={classNames(
        "w-full border-b last:border-b-0 hover:bg-slate-100 text-left flex-nowrap border-slate-200 rounded-sm md:flex flex-row grid grid-cols-2 items-center gap-3 py-4 px-2 transition-colors"
      )}
      onClick={() => onClick(smartList.id)}
    >
      <div className="font-bold w-44">{smartList.name}</div>
    </div>
  );
}
