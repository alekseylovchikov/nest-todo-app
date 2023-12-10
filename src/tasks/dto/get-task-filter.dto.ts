import { IsIn, IsOptional } from 'class-validator';
import { TaskStatuses } from '../task.model';

export class GetTaskFilterDto {
  @IsOptional()
  @IsIn(Object.values(TaskStatuses))
  status?: TaskStatuses;

  search?: string;
}
