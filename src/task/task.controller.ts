import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { TaskDto } from './task.dto.js';
import type { FindAllParameters } from './task.dto.js';
import { TaskService } from './task.service.js';
import { Task } from './entities/task.entity.js';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() task: TaskDto) {
    return this.taskService.create(task);
  }

  
  @Get()
  findAll(): Promise<Task[]> {
     return this.taskService.findAll();
  }

  @Get("/:title")
  findByTitle(@Param("title") title: string): Promise<Task[]>{
    return this.taskService.findByTitle(title); 
  }

  /*
  @Get()
  findAll(@Query() params: FindAllParameters): TaskDto[] {
    return this.taskService.findAll(params);
  }

  

  @Get('/:id')
  findById(@Param('id') id: string): TaskDto {
    return this.taskService.findById(id);
  }

  @Put()
  update(@Body() task: TaskDto) {
    return this.taskService.update(task);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
  
  
  */
  }
