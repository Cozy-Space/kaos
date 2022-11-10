import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TagBrushContext } from "../context/TagBrushContext";

interface Props {
  children: ReactNode | ReactNode[];
}

export function TagBrushProvider({ children }: Props) {
  const [tag, setTag] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);
  const location = useLocation();

  const activate = (tag: string) => {
    setTag(tag);
    setActive(true);
  };

  const deactivate = () => {
    setTag("");
    setActive(false);
  };

  useEffect(() => {
    deactivate();
  }, [location]);

  return (
    <TagBrushContext.Provider value={{ tag, active, activate, deactivate }}>
      {children}
    </TagBrushContext.Provider>
  );
}
