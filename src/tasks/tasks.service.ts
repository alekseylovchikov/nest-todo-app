import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaskStatuses } from './task-statuses.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

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

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  async updateTaskStatus(
    id: string,
    { status: newStatus }: UpdateTaskStatusDto,
  ): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = newStatus;
    await this.tasksRepository.save(task);

    return task;
  }
}
