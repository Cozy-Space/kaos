import {
  faRightFromBracket,
  faGear,
  faStickyNote,
  faCube,
  faLocationDot,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useContainerApi } from "../hooks/ApiHook";
import { useContext, useMemo, useState } from "react";
import { useLogin } from "../hooks/LoginHook";
import { FontawesomeObject, IconProp } from "@fortawesome/fontawesome-svg-core";

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
  const { pathname } = useLocation();
  const { logout, me } = useLogin();
  const navigate = useNavigate();

  return (
    <div
      className={
        "fixed left-0 top-0 flex flex-col gap-4 bg-slate-700 h-screen p-2 items-center"
      }
    >
      <img
        onClick={() => navigate("/dashboard/containers")}
        src="/kaos_t.svg"
        className="h-14 rounded-lgq"
        alt=""
      />
      <div className="bg-slate-500 h-1 w-8 rounded-full"></div>

      <Item text="Container" icon={faCube} link="/dashboard/containers" />
      <Item text="Locations" icon={faLocationDot} link="/dashboard/locations" />
      <Item text="Move" icon={faTruck} link="/dashboard/move" />
      <Item text="Sticker" icon={faStickyNote} link="/dashboard/sticker" />
      <Item text="Settings" icon={faGear} link="/dashboard/settings" />
      <Item
        text="Logout"
        icon={faRightFromBracket}
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white border-0 mt-auto"
      />
    </div>
  );
}

interface ItemProps {
  text: string;
  icon: IconProp;
  link?: string;
  onClick?: () => void;
  className?: string;
}

function Item({
  text,
  icon,
  link,
  onClick = () => {},
  className = "",
}: ItemProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const active = useMemo(
    () => location.pathname.startsWith(link || "x"),
    [location, link]
  );

  const handleClick = () => {
    if (link) navigate(link);
    else onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={classNames(
        "group h-14 w-14 bg-slate-500 text-white hover:bg-blue-400  relative flex items-center justify-center text-lg shadow-md rounded-[30px] hover:rounded-lg transition-all",
        className,
        { "bg-blue-400": active }
      )}
    >
      <FontAwesomeIcon icon={icon} />
      <div className="group-hover:opacity-100 pointer-events-none opacity-0 absolute left-20 text-lg bg-slate-700 text-white px-4 py-1 rounded-md transition-all">
        {text}
        <div className="absolute z-50 left-1 h-4 w-4 bg-slate-700 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-sm"></div>
      </div>
    </div>
  );
}
