import { Injectable, NotFoundException } from '@nestjs/common';

import { TaskStatuses } from './task-statuses.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  getTasks(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  createTask({ title, description }: CreateTaskDto): Promise<Task> {
    const task = new Task();

    task.title = title;
    task.description = description;
    task.status = TaskStatuses.OPEN;

    return this.tasksRepository.save(task);
  }

  // getTasks({ status, search = '' }: GetTaskFilterDto): Task[] {
  //   if (!status && !search.trim()) return this.tasks;

  //   return this.tasks.filter((task) => {
  //     const taskText = (task.title + task.description).toLowerCase();

  //     return (
  //       (status ? task.status === status : true) &&
  //       taskText.includes(search.toLowerCase())
  //     );
  //   });
  // }

  // getTaskById(id: string): Task {
  //   const task = this.tasks.find((task) => task.id === id);

  //   if (!task) {
  //     throw new NotFoundException(`Task with id ${id} not found`);
  //   }

  //   return task;
  // }

  // deleteTaskById(id: string): Task {
  //   const task = this.getTaskById(id);

  //   this.tasks = this.tasks.filter((task) => task.id !== id);

  //   return task;
  // }

  // updateTaskStatus(id: string, { status }: UpdateTaskStatusDto): Task {
  //   const task = this.getTaskById(id);

  //   task.status = status;

  //   return task;
  // }

  // createTask({ title, description }: CreateTaskDto): Task {
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatuses.OPEN,
  //   };

  //   this.tasks.unshift(task);

  //   return task;
  // }
}
