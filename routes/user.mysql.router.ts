import express, { Request, Response, NextFunction } from "express";
const userRouter = express.Router();
import bcrypt from "bcrypt";

import * as userMysqlService from "./../services/user.mysql.service";
import toNewUserEntry from "./../models/userUtils";
import { User } from "../models/mysqlUser";

userRouter.get(
  "/",
  async (_req: Request, res: Response, next: NextFunction) => {
    userMysqlService.findAll((err: Error, users: User[]) => {
      if (err) {
        next(err);
      }
      res.json({ data: users });
    });
  }
);

userRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { params } = req;
    const userId: number = Number(params.id);
    userMysqlService.findOne(userId, (err: Error, user: User) => {
      if (err) {
        next(err);
      }
      res.json({ data: user });
    });
  }
);

userRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const { fullname, email, password, scholarship, role } = body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const dataForUser = {
      fullname,
      email,
      password: passwordHash,
      scholarship,
      role,
    };
    const newUserEntry = toNewUserEntry(dataForUser);
    userMysqlService.create(newUserEntry, (err: Error, userId: number) => {
      if (err) {
        next(err);
      }
      res.status(201).json({ userId });
    });
  }
);

userRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { body, params } = req;
    const userId = Number(params.id);
    const { fullname, email, password, scholarship, role } = body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const dataForUser = {
      fullname,
      email,
      password: passwordHash,
      scholarship,
      role,
    };
    const newUserEntry = toNewUserEntry(dataForUser);
    userMysqlService.update(
      userId,
      newUserEntry,
      (err: Error, info: string) => {
        if (err) {
          next(err);
        }
        res.json({ info });
      }
    );
  }
);

export default userRouter;
