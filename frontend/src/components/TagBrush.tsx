import { faBrush, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { createRef, useState } from "react";
import { useContainerApi } from "../hooks/ApiHook";
import { useTagBrush } from "../hooks/TagBrushHook";

export function TagBrush() {
  const tagBrush = useTagBrush();
  const [tag, setTag] = useState<string>("");

  const toggle = () => {
    if (tagBrush.active) {
      tagBrush.deactivate();
    } else {
      tagBrush.activate(tag);
    }
  };

  return (
    <button className="bg-slate-700 text-white px-4 rounded-full">
      <FontAwesomeIcon
        onClick={toggle}
        icon={faBrush}
        className={classNames("pr-2 transition-all", {
          "animate-pulse": tagBrush.active,
        })}
      />
      {tagBrush.active ? (
        <span className="inline-block bg-transparent focus:outline-none w-24 text-center">
          {tag}
        </span>
      ) : (
        <input
          className="bg-transparent focus:outline-none w-24 text-center"
          value={tag}
          placeholder="Tag Brush"
          onChange={(e) => setTag(e.target.value)}
        />
      )}
    </button>
  );
}
