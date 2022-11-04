import { Container } from "./Container";

export type Location = {
  id: number;
  name: string;
  containers?: Container[];
};
