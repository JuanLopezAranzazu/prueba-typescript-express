import express, { Request, Response, NextFunction } from "express";
const scholarshipRouter = express.Router();

import * as scholarshipMysqlService from "./../services/scholarship.mysql.service";
import toNewScholarshipsEntry from "./../models/mysqlUtils";
import { Scholarship } from "../models/mysqlScholarship";

scholarshipRouter.get(
  "/",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      scholarshipMysqlService.findAll(
        (err: Error, scholarships: Scholarship[]) => {
          if (err) {
            throw err;
          }
          res.json({ data: scholarships });
        }
      );
    } catch (err) {
      next(err);
    }
  }
);

scholarshipRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { params } = req;
      const scholarshipId: number = Number(params.id);
      scholarshipMysqlService.findOne(
        scholarshipId,
        (err: Error, scholarship: Scholarship) => {
          if (err) {
            throw err;
          }
          res.json({ data: scholarship });
        }
      );
    } catch (err) {
      next(err);
    }
  }
);

scholarshipRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const newScholarshipEntry = toNewScholarshipsEntry(body);
      scholarshipMysqlService.create(
        newScholarshipEntry,
        (err: Error, scholarshipId: number) => {
          if (err) {
            throw err;
          }
          res.status(201).json({ scholarshipId });
        }
      );
    } catch (err) {
      next(err);
    }
  }
);

export default scholarshipRouter;
