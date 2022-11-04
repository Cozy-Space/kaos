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

interface Props {
  container: Container;
  selected?: boolean;
}

export function ContainerListItem({ container, selected = false }: Props) {
  const navigate = useNavigate();
  const handleClick = () => navigate("/dashboard/containers/" + container.id);
  return (
    <div
      className={classNames(
        "w-full border-b last:border-b-0 hover:bg-slate-100 text-left flex-nowrap border-slate-200 rounded-sm md:flex flex-row grid grid-cols-2 items-center gap-3 py-4 px-2 transition-colors"
      )}
      onClick={handleClick}
    >
      <div className="font-bold w-44">{container.name}</div>

      <div className="font-mono md:hidden row-span-2 justify-center px-2 p-0.5 text-right text-black rounded-sm">
        {container.code}
      </div>

      <div className={" text-slate-500 w-44"}>
        <FontAwesomeIcon icon={faLocationDot} className="pr-1" />
        {container.location?.name}
      </div>
      <div className="row-span-2 md:flex overflow-hidden hidden flex-row gap-1 mr-auto">
        {container.tags?.split(",").map((tag) => (
          <Tag text={tag} />
        ))}
      </div>
      <div className="font-mono hidden md:block  text-black rounded-sm">
        {container.code}
      </div>
    </div>
  );
}
