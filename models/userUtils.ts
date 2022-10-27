import { NewUserEntry } from "./mysqlUser";
import { Role } from "./enums";

const parseDataUser = (dataFromRequest: any): string => {
  if (!isString(dataFromRequest)) {
    throw new Error("Incorrect or missing fullname or email or password");
  }
  return dataFromRequest;
};

const parseRole = (roleFromRequest: any): Role => {
  if (!isString(roleFromRequest) || !isRole(roleFromRequest)) {
    throw new Error("Incorrect or missing role");
  }
  return roleFromRequest;
};

const isRole = (param: any): boolean => {
  return Object.values(Role).includes(param);
};

const isString = (string: string): boolean => {
  return typeof string === "string";
};

const toNewUser = (object: any): NewUserEntry => {
  const newEntry: NewUserEntry = {
    fullname: parseDataUser(object.fullname),
    email: parseDataUser(object.email),
    password: parseDataUser(object.password),
    role: parseRole(object.role),
    scholarship: object.scholarship,
  };
  return newEntry;
};

export default toNewUser;
