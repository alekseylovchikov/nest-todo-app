import { IsIn } from 'class-validator';
import { TaskStatuses } from '../task.model';

export class UpdateTaskStatusDto {
  @IsIn(Object.values(TaskStatuses))
  status: TaskStatuses;
}
