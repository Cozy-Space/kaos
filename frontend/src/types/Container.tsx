import { Location } from "./Location";
export type Container = {
  id: number;
  name: string;
  tags: string;
  imageUrl: string;
  location?: Partial<Location>;
  code: string;
};
