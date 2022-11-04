import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "../types/Container";
import { Tag } from "./Tag";
import {
  faLocationDot,
  faSquareCheck,
  faSquare,
  faGlasses,
  faTrash,
  faCube,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// @ts-ignore
import Barcode from "react-barcode";
import { Checkbox } from "./Checkbox";
import classNames from "classnames";
import { Location } from "../types/Location";
import { createRef, useEffect, useState } from "react";
import { useLocationApi } from "../hooks/ApiHook";

interface Props {
  location: Partial<Location>;
  onBlur?: () => void;
}

export function LocationListItem({ location, onBlur = () => {} }: Props) {
  const navigate = useNavigate();
  const locationApi = useLocationApi();
  const [currentLocation, setCurrentLocation] = useState<Partial<Location>>();

  useEffect(() => {
    if (location) setCurrentLocation(location);
  }, [location]);

  const handleClick = () =>
    navigate("/dashboard/containers?query=" + location.name);

  const hanldeRemove = async () => {
    await locationApi.remove(location);
    locationApi.load();
  };

  const handleSave = async () => {
    if (currentLocation && currentLocation.name?.length) {
      await locationApi.save(currentLocation);
      await locationApi.load();
    }
    onBlur();
  };

  const input = createRef<HTMLInputElement>();

  useEffect(() => {
    if (!location.id) input.current?.focus();
  }, []);

  return (
    <div
      className={classNames(
        "group w-full border-b last:border-b-0 hover:bg-slate-100 text-left flex-nowrap border-slate-200 rounded-md md:flex flex-row grid grid-cols-2 items-center gap-3 py-4 px-2 transition-colors"
      )}
    >
      <div className={" text-slate-800  flex items-center"}>
        <FontAwesomeIcon icon={faLocationDot} className="pr-2" />
        <input
          className="bg-transparent focus:outline-none"
          ref={input}
          onChange={(e) =>
            setCurrentLocation((l) => ({ ...l, name: e.target.value }))
          }
          onBlur={handleSave}
          type="text"
          defaultValue={location.name}
        />
      </div>
      <div className="flex gap-2 items-center">
        {location.containerCount} <FontAwesomeIcon icon={faCube} />
      </div>
      {location.id && (
        <div className="flex group-hover:opacity-100 opacity-0 transition-opacity ml-auto gap-2">
          <button
            onClick={handleClick}
            className=" bg-slate-700 text-white rounded-full flex items-center justify-center h-8 w-8"
          >
            <FontAwesomeIcon icon={faGlasses} className="h-3 w-3" />
          </button>
          <button
            onClick={hanldeRemove}
            className=" bg-red-500 text-white rounded-full flex items-center justify-center h-8 w-8"
          >
            <FontAwesomeIcon icon={faTrash} className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}
