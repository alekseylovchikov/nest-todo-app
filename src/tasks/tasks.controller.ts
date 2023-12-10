import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatuses } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    return this.tasksService.getTasks(filterDto);
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

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatuses,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
