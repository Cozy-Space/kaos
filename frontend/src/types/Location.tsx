import { Container } from "./Container";

export type Location = {
  id: number;
  name: string;
  containerCount?: number;
  containers?: Container[];
};
