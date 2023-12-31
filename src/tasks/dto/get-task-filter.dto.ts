import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatuses } from '../task-statuses.enum';

export class GetTaskFilterDto {
  @IsOptional()
  @IsIn(Object.values(TaskStatuses))
  status?: TaskStatuses;

  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
