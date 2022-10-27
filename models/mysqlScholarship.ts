import { Category } from "./enums";

export interface Scholarship {
  id: number;
  name: string;
  percentage: number;
  category: Category;
}

export type NewScholarshipEntry = Omit<Scholarship, "id">;
