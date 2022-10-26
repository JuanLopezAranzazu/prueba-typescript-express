import express, { Request, Response, NextFunction } from "express";
const scholarshipsRouter = express.Router();

import * as scholarshipsService from "./../services/scholarships.service";
import toNewScholarshipsEntry from "./../models/utils";

scholarshipsRouter.get(
  "/filter",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { query } = req;
      let category: string;
      if (!query) category = "national";
      category = String(query.category);
      const scholarships = scholarshipsService.filterScholarships(category);
      console.log(scholarships);
      res.json(scholarships);
    } catch (error) {
      next(error);
    }
  }
);

scholarshipsRouter.get(
  "/",
  (_req: Request, res: Response, next: NextFunction) => {
    try {
      const scholarships = scholarshipsService.getSholarships();
      res.json(scholarships);
    } catch (error) {
      next(error);
    }
  }
);

scholarshipsRouter.get(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { params } = req;
      const id: number = Number(params.id);
      const scholarships = scholarshipsService.findById(id);
      res.json(scholarships);
    } catch (error) {
      next(error);
    }
  }
);

scholarshipsRouter.post(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const newScholarshipsEntry = toNewScholarshipsEntry(body);
      const savedScholarships =
        scholarshipsService.addScholarships(newScholarshipsEntry);
      res.status(201).json(savedScholarships);
    } catch (error) {
      next(error);
    }
  }
);

scholarshipsRouter.put(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body, params } = req;
      const id = Number(params.id);
      const updateScholarshipsEntry = toNewScholarshipsEntry(body);
      const updatedScholarships = scholarshipsService.updateScholarships(
        id,
        updateScholarshipsEntry
      );
      res.status(200).json(updatedScholarships);
    } catch (error) {
      next(error);
    }
  }
);

scholarshipsRouter.delete(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { params } = req;
      const id: number = Number(params.id);
      scholarshipsService.deleteScholarships(id);
      res.status(204).json({
        message: `Scholarship #${id} successfully deleted`,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default scholarshipsRouter;
