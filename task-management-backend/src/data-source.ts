/**
 * @description
 *  Create appicaltion database datasource instance.
 *  Data source instance will used throughout application for query database.
 */

import * as dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "./entities/task.entity";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,

  synchronize: false, // Disabled model sync with database through entity directly.
  logging: NODE_ENV === "dev" ? true : false, // query logger is disabled for server(stage, prod).
  entities: [Task], // Register entity for datasource.
  migrations: [__dirname + "/../../src/migration/*.ts"], // target migration stript folder.
  subscribers: [],
});
