import { DataSource, DataSourceOptions } from "typeorm";
import { Task } from "./entities/task.entity";
import * as sqlite from "sqlite3";

export const testdb = new sqlite.Database(":memory:");

const ormConfig: DataSourceOptions = {
  type: "sqlite",
  database: ":memory:",
  entities: [Task],
  dropSchema: true,
  synchronize: true,
  logging: false,
};

export const dataSource = new DataSource(ormConfig);

export const initializeDatabase = async () => {
  await dataSource.initialize();
};
