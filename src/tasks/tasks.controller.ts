import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() { title, description }: CreateTaskDto): Task {
    const errors: Record<string, string> = {};

    if (title.trim() === '') errors.title = 'Field is required';
    if (description.trim() === '') errors.description = 'Field is required';

    if (Object.keys(errors).length !== 0) {
      throw new BadRequestException(errors);
    }

    return this.tasksService.createTask({ title, description });
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string) {
    return this.tasksService.deleteTaskById(id);
  }
}
