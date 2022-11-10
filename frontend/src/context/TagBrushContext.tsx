import { createContext } from "react";

export interface TagBrushContextType {
  tag: string;
  active: boolean;
  activate: (tag: string) => void;
  deactivate: () => void;
}

export const TagBrushContext = createContext<TagBrushContextType>({
  tag: "",
  active: false,
  activate: () => {},
  deactivate: () => {},
});
