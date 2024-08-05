import * as express from "express";
import { TaskController } from "../controllers/task.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { TaskDto } from "../dto/task.dto";
const Router = express.Router();

Router.get("/tasks", TaskController.getAllTasks);
Router.get("/tasks/:id", TaskController.getTask);
Router.post("/tasks", validationMiddleware(TaskDto), TaskController.addTask);
Router.put("/tasks/:id", TaskController.editTask);
Router.delete("/tasks/:id", TaskController.deleteTask);

export { Router as taskRouter };
