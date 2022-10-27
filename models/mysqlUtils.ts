import { NewScholarshipEntry } from "./mysqlScholarship";
import { Category } from "./enums";

const parseName = (nameFromRequest: any): string => {
  if (!isString(nameFromRequest)) {
    throw new Error("Incorrect or missing name");
  }
  return nameFromRequest;
};

const parsePercentage = (percentageFromRequest: any): number => {
  if (!isNumber(percentageFromRequest)) {
    throw new Error("Incorrect or missing percentage");
  }
  if (percentageFromRequest < 1 || percentageFromRequest > 100) {
    throw new Error("Incorrect value in percentage");
  }
  return percentageFromRequest;
};

const parseCategory = (categoryFromRequest: any): Category => {
  if (!isString(categoryFromRequest) || !isCategory(categoryFromRequest)) {
    throw new Error("Incorrect or missing category");
  }
  return categoryFromRequest;
};

const isCategory = (param: any): boolean => {
  return Object.values(Category).includes(param);
};

const isString = (string: string): boolean => {
  return typeof string === "string";
};

const isNumber = (number: number): boolean => {
  return typeof number === "number";
};

const toNewScholarship = (object: any): NewScholarshipEntry => {
  const newEntry: NewScholarshipEntry = {
    name: parseName(object.name),
    category: parseCategory(object.category),
    percentage: parsePercentage(object.percentage),
  };
  return newEntry;
};

export default toNewScholarship;