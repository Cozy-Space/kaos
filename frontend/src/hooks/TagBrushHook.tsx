import { useContext } from "react";
import { TagBrushContext } from "../context/TagBrushContext";

export function useTagBrush() {
  const tagBrushContext = useContext(TagBrushContext);

  return tagBrushContext;
}
