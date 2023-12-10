import { TaskStatuses } from '../task.model';

export class GetTaskFilterDto {
  status?: TaskStatuses;
  search?: string;
}
