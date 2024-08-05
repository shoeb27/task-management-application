/**
 * @module app
 * @description
 *  - Configure express application with typescript
 *  - Configure muddlewares like json parser, error handler etc...
 */

import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as express from "express";
import { Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import * as morgan from "morgan";
import "reflect-metadata";
import { errorHandler } from "./middlewares/error.middleware";
import { taskRouter } from "./routes/task.routes";

dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(errorHandler);

app.use("/api", taskRouter);

app.get("*", (_req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

export default app;
