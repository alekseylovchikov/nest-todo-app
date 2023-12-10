import { IsIn } from 'class-validator';
import { TaskStatuses } from '../task-statuses.enum';

export class UpdateTaskStatusDto {
  @IsIn(Object.values(TaskStatuses))
  status: TaskStatuses;
}
