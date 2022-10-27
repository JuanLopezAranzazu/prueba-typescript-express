import { Category } from "./enums";

export interface BasicScholarship {
  id: number;
}

export interface Scholarship extends BasicScholarship {
  name: string;
  percentage: number;
  category: Category;
}

export type NewScholarshipEntry = Omit<Scholarship, "id">;
