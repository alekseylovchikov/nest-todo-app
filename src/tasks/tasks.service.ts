import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaskStatuses } from './task-statuses.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';

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

  async createTask({ title, description }: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatuses.OPEN,
    });

    await this.tasksRepository.save(task);

    return task;
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
}
