import { Scholarships, NewScholarshipsEntry } from "./../models/scholarships";

import scholarshipsData from "./scholarships.json";
let scholarships: Scholarships[] = scholarshipsData as Scholarships[];

export const getSholarships = (): Scholarships[] => scholarships;

export const filterScholarships = (category: string): Scholarships[] => {
  return scholarships.filter((item) => item.category === category);
};

export const findById = (id: number): Scholarships | undefined => {
  const scholarship = scholarships.find((item) => item.id === id);
  if (!scholarship) {
    throw new Error(`Sholarship #${id} not found`);
  }
  return scholarship;
};

export const addScholarships = (
  newScholarshipsEntry: NewScholarshipsEntry
): Scholarships => {
  const newScholarships = {
    id: Math.max(...scholarships.map((item) => item.id)) + 1,
    ...newScholarshipsEntry,
  };

  scholarships.push(newScholarships);
  return newScholarships;
};

export const updateScholarships = (
  id: number,
  newScholarshipsEntry: NewScholarshipsEntry
): Scholarships => {
  const index = scholarships.findIndex((item) => item.id === id);
  if (index < 0) {
    throw new Error(`Scholarship #${id} not found`);
  }
  scholarships[index] = {
    id,
    ...newScholarshipsEntry,
  };
  return scholarships[index];
};

export const deleteScholarships = (id: number) => {
  const sholarship = findById(id);
  if (!sholarship) {
    throw new Error(`Scholarship #${id} not found`);
  }
  scholarships = scholarships.filter((item) => item.id !== id);
};
