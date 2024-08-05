import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Task } from "../entities/task.entity";

/**
 * @class TaskController
 * @description
 *    Task Controller is provide CRUD API for tasks.
 */
export class TaskController {
  /**
   * @function getAllTasks
   * @description
   *    - This endpoint is return the list of tasks.
   *    - Exclude soft deleted and inactive tasks.
   * @param { Request } _req
   * @param { Response } res
   */
  static async getAllTasks(_req: Request, res: Response) {
    try {
      const taskRepository = AppDataSource.getRepository(Task);
      const data = await taskRepository.find({
        where: {
          is_active: true,
          is_deleted: false,
        },
      });
      return res.json({ success: true, data, message: "Task List" });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @function getTask
   * @description
   *    - This endpoint return a task object.
   * @param { Request } req
   * @param { Response } res
   */
  static async getTask(req: Request, res: Response) {
    try {
      const taskRepository = AppDataSource.getRepository(Task);
      const data = await taskRepository.findOne({
        where: {
          id: parseInt(req.params.id),
          is_active: true,
          is_deleted: false,
        },
      });
      return res.json({ success: true, data, message: "Task List" });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @function addTask
   * @description
   *    - This endpoint is create new task for user.
   *    - title, description and status should be mandetory fields.
   * @param { Request } req
   * @param { Response } res
   */
  static async addTask(req: Request, res: Response) {
    try {
      const body = req.body;
      const taskRepository = AppDataSource.getRepository(Task);
      const data = await taskRepository.save({
        title: body.title,
        description: body.description,
        status: body.status,
      });
      return res.json({
        success: true,
        data,
        message: "Task has been created successfuly.",
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @function editTask
   * @description
   *    - This endpoint is edit task using task id
   *    - task id, title, description and status should be mandetory fields.
   * @param { Request } req
   * @param { Response } res
   */
  static async editTask(req: Request, res: Response) {
    try {
      const params = req.params;
      const body = req.body;
      const taskRepository = AppDataSource.getRepository(Task);

      const task = await taskRepository.findOne({
        where: {
          id: +params.id,
          is_active: true,
          is_deleted: false,
        },
      });

      // Check task id is exists in database or not.
      if (!task) {
        return res.json({ success: false, message: "Task is not exists." });
      }

      await taskRepository.update(
        { id: task.id },
        {
          title: body.title,
          description: body.description,
          status: body.status,
        }
      );

      const data = await taskRepository.findOne({
        where: {
          id: +params.id,
          is_active: true,
          is_deleted: false,
        },
      });

      return res.json({
        success: true,
        data,
        message: "Task has been updated successfuly.",
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @function deleteTask
   * @description
   *    - This endpoint is delete task using task id.
   *    - task id should be mandetory field.
   * @param {Request} req
   * @param {Response} res
   */
  static async deleteTask(req: Request, res: Response) {
    try {
      const params = req.params;
      const taskRepository = AppDataSource.getRepository(Task);

      const task = await taskRepository.findOne({
        where: {
          id: Number(params.id),
          is_active: true,
          is_deleted: false,
        },
      });

      // Check task id is exists in database or not.
      if (!task) {
        return res.json({ success: false, message: "Task is not exists." });
      }

      await taskRepository.update(
        { id: task.id },
        {
          is_deleted: true,
        }
      );

      return res.json({
        success: true,
        data: { id: task.id },
        message: "Task has been deleted successfuly.",
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
