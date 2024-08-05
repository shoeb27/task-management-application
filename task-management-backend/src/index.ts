import { AppDataSource } from "./data-source";
import app from "./app";

const { PORT = 3000 } = process.env;

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
