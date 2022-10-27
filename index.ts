import express, { NextFunction, Request, Response } from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "hola mundo" });
});

import scholarshipsRouter from "./routes/scholarships.router";
import scholarshipMysqlRouter from "./routes/scholarship.mysql.router";
import userMysqlRouter from "./routes/user.mysql.router";

app.use("/api/v1/scholarships", scholarshipsRouter);
app.use("/api/v1/scholarships-mysql", scholarshipMysqlRouter);
app.use("/api/v1/users-mysql", userMysqlRouter);

app.use((err: Error, _req: Request, _res: Response, next: NextFunction) => {
  console.log("logErrors");
  console.error(err);
  next(err);
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log("errorHandler");
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port ${port}`));
