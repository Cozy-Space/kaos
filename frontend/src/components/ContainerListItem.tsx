import { useNavigate } from "react-router-dom";
import { Container } from "../types/Container";
import { Tag } from "./Tag";
import {
  faLocationDot,
  faSquareCheck,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// @ts-ignore
import Barcode from "react-barcode";
import { Checkbox } from "./Checkbox";
import classNames from "classnames";
import { TagInput } from "./TagInput";

interface Props {
  container: Container;
  onClick: () => void;
  selected?: boolean;
}

export function ContainerListItem({
  container,
  selected = false,
  onClick,
}: Props) {
  const navigate = useNavigate();

  return (
    <div
      className={classNames(
        "w-full border-b last:border-b-0 hover:bg-slate-100 text-left flex-nowrap border-slate-200 rounded-sm md:flex flex-row grid grid-cols-2 items-center gap-3 py-4 px-2 transition-colors"
      )}
      onClick={onClick}
    >
      <div className="font-bold w-44">{container.name}</div>

      <div className="font-mono md:hidden row-span-2 justify-center px-2 p-0.5 text-right text-black rounded-sm">
        {container.code}
      </div>

      <div className={" w-44"}>
        <FontAwesomeIcon icon={faLocationDot} className="pr-1" />
        {container.location?.name}
      </div>
      <TagInput defaultValue={container.tags} />

      <div className="font-mono hidden md:block ml-auto text-black rounded-sm">
        {container.code}
      </div>
    </div>
  );
}
