import { Role } from "./enums";
import { BasicScholarship } from "./mysqlScholarship";

export interface BasicUser {
  id: number;
}

export interface User extends BasicUser {
  fullname: string;
  email: string;
  password: string;
  role: Role;
  scholarship: BasicScholarship;
}

export type NewUserEntry = Omit<User, "id">;
