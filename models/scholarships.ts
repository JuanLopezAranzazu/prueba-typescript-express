import { Category } from "./enums";

export interface Scholarships {
  id: number;
  name: string;
  percentage: number;
  category: Category;
  requirements: string[];
}

export type NewScholarshipsEntry = Omit<Scholarships, "id">;
