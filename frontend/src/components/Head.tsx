import {
  faRightFromBracket,
  faGear,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useContainerApi } from "../hooks/ApiHook";
import { useContext, useState } from "react";
import { useLogin } from "../hooks/LoginHook";

const links = [
  {
    name: "Containers",
    path: "/dashboard/containers",
  },
  {
    name: "Locations",
    path: "/dashboard/locations",
  },
];

export function Head() {
  const [moving, setMoving] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { logout, me } = useLogin();

  const handleMove = () => {
    if (moving) {
      setMoving(false);
    } else {
      navigate("dashboard/containers");
      setMoving(true);
    }
  };

  return (
    <div
      className={
        "w-full flex h-16 items-end border-b border-b-slate-300 gap-6 mb-4"
      }
    >
      <div className={"text-4xl text-slate-500"}>KAOS</div>
      {links.map((link, key) => (
        <Link
          key={key}
          to={link.path}
          className={classNames(
            "text-lg text-slate-500 border-b-2",
            { "border-slate-300": link.path === pathname },
            { "border-transparent": link.path !== pathname }
          )}
        >
          {link.name}
        </Link>
      ))}
      <div className={"ml-auto flex gap-1"}>
        <button
          onClick={() => navigate("/dashboard/sticker")}
          className={
            "h-8 w-8 gap-2 text-white text-sm mb-1 flex items-center justify-center bg-slate-500 rounded-full"
          }
        >
          <FontAwesomeIcon icon={faStickyNote} />
        </button>
        <button
          onClick={() => navigate("/dashboard/settings")}
          className={
            "h-8 w-8 gap-2 text-white text-sm mb-1 flex items-center justify-center bg-slate-500 rounded-full"
          }
        >
          <FontAwesomeIcon icon={faGear} />
        </button>
        <button
          onClick={logout}
          className={
            "h-8 px-4 gap-2 text-white text-sm mb-1 flex items-center justify-center bg-red-500 rounded-full"
          }
        >
          {me?.name || "Logout"}
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
    </div>
  );
}
