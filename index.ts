import express, { NextFunction, Request, Response } from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "hola mundo" });
});

import scholarshipsRouter from "./routes/scholarships.router";
app.use("/api/v1/scholarships", scholarshipsRouter);

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

const port = 3001;
app.listen(port, () => console.log(`Server running in port ${port}`));
