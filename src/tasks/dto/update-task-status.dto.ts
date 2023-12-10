import { IsIn } from 'class-validator';
import { TaskStatuses } from '../task-status.enum';

export class UpdateTaskStatusDto {
  @IsIn(Object.values(TaskStatuses))
  status: TaskStatuses;
}
