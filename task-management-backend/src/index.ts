/**
 * @description
 *  Create connection with database server.
 *  Listen server on port 3000 or any given port in env file.
 */

import { AppDataSource } from "./data-source";
import app from "./app";

const { PORT = 3000 } = process.env;

// Initialize database before create server.
AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
