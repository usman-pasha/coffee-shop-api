import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import responser from "./api/core/responser";
import openDataBase from "./api/core/db";
import logger from "./api/core/log";
import routes from "./api/routers/index.router";
import AppError from "./api/core/appError";
import { globalError } from "./api/core/globalError";
import morgan from "morgan";
import SwaggerUi from "swagger-ui-express";
import * as swaggerDocs from "./swagger/rule.json";
import { api as apiSettings } from "./api/siteSettings/default.setting";

const app = express();
app.use(helmet());
// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options("*", cors());
app.use(morgan("dev"));
openDataBase();

app.use(
  `/${apiSettings.api}/${apiSettings.version}/Docs`,
  SwaggerUi.serve,
  SwaggerUi.setup(swaggerDocs)
);
routes(app);

app.get(
  `/${apiSettings.api}/${apiSettings.version}`,
  (req: Request, res: Response) => {
    logger.info(`Get Api Request`);
    const data: any = "Welcome To Coffee Shop Management";
    return responser.send(200, "health check up", req, res, data);
  }
);
app.all("*", (req: Request, res: Response) => {
  throw new AppError(404, `${req.originalUrl} EndPoint Not Found`);
});

app.use(globalError);

export default app;
