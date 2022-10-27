import { db } from "../libs/db";
import { NewScholarshipEntry } from "../models/mysqlScholarship";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (
  newScholarshipEntry: NewScholarshipEntry,
  callback: Function
) => {
  const { name, percentage, category } = newScholarshipEntry;
  const queryString =
    "INSERT INTO scholarship (name, percentage, category) VALUES (?, ?, ?)";

  db.query(queryString, [name, percentage, category], (err, result) => {
    if (err) {
      callback(err);
    }
    const insertId = (<OkPacket>result).insertId;
    callback(null, insertId);
  });
};

export const findOne = (scholarshipId: number, callback: Function) => {
  const queryString = `SELECT * FROM scholarship WHERE id = ?`;

  db.query(queryString, scholarshipId, (err, result) => {
    if (err) {
      callback(err);
    }
    const row = (<RowDataPacket>result)[0];
    callback(null, row);
  });
};

export const findAll = (callback: Function) => {
  const queryString = `SELECT * FROM scholarship WHERE true`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }
    const rows = <RowDataPacket>result;
    callback(null, rows);
  });
};
