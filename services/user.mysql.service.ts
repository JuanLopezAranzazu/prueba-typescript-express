import { db } from "../libs/db";
import { NewUserEntry } from "../models/mysqlUser";
import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

export const create = (newUserEntry: NewUserEntry, callback: Function) => {
  const { fullname, email, password, scholarship, role } = newUserEntry;
  console.log("data", newUserEntry);
  const queryString =
    "INSERT INTO user (fullname, email, password, scholarshipId, role) VALUES (?, ?, ?, ?, ?)";

  db.query(
    queryString,
    [fullname, email, password, scholarship, role],
    (err, result) => {
      if (err) {
        console.log("entro", err.message);
        callback(err);
      }
      console.log(result);
      const insertId = (<OkPacket>result).insertId;
      callback(null, insertId);
    }
  );
};

export const findAll = (callback: Function) => {
  const queryString = `SELECT * FROM user WHERE true`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }
    const rows = <RowDataPacket>result;
    callback(null, rows);
  });
};

export const findOne = (userId: number, callback: Function) => {
  const queryString = `SELECT * FROM user WHERE id = ?`;

  db.query(queryString, userId, (err, result) => {
    if (err) {
      callback(err);
    }
    const row = (<RowDataPacket>result)[0];
    callback(null, row);
  });
};

export const update = (
  userId: number,
  updateUserEntry: NewUserEntry,
  callback: Function
) => {
  const { fullname, email, password, scholarship, role } = updateUserEntry;
  const queryString = `UPDATE user SET fullname = ?, email = ?, password = ?, 
  role = ?, scholarshipId = ? WHERE id = ?`;

  db.query(
    queryString,
    [fullname, email, password, role, scholarship, userId],
    (err, result) => {
      if (err) {
        callback(err);
      }
      console.log(result);
      const info = (<ResultSetHeader>result).info;
      callback(null, info);
    }
  );
};
