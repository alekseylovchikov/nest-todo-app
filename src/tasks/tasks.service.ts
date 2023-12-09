import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Task, TaskStatuses } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '123',
      title: 'hello',
      description: 'hello 123',
      status: TaskStatuses.OPEN,
    },
    {
      id: '29182',
      title: 'wow',
      description: 'hello 02',
      status: TaskStatuses.DONE,
    },
    {
      id: '912',
      title: 'wow 123',
      description: 'HI!',
      status: TaskStatuses.IN_PROGESS,
    },
  ];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  createTask({ title, description }: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatuses.OPEN,
    };

    this.tasks.unshift(task);

    return task;
  }
}
