import { DataSource, DataSourceOptions } from "typeorm";

const ormConfig: DataSourceOptions = {
  type: "sqlite", // or other DB type
  database: "test.db", // Use an in-memory database for testing
  entities: [__dirname + './**/*.entity.js'],
  dropSchema: false,
  synchronize: true,
  logging: false,
};

export const dataSource = new DataSource(ormConfig);

export const initializeDatabase = async () => {
  await dataSource.initialize();
};
