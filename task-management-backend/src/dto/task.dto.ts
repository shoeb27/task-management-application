import { IsEnum, IsString } from "class-validator";
import { TaskStatus } from "../enums/task";

/**
 * @class TaskDto
 * @description
 *    - Data transfer object for required and optional fields for create, update task.
 *    - class validator provides common property decorators for set validation to each property.
 */
export class TaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsEnum(TaskStatus)
  status: string;
}
