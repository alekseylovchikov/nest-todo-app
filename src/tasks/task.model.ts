export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatuses;
}

export enum TaskStatuses {
  OPEN = 'OPEN',
  IN_PROGESS = 'IN_PROGESS',
  DONE = 'DONE',
}
