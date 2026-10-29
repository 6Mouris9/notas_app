import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TaskDto } from './task.dto.js';
import { TaskService } from './task.service.js';

@Controller('task')
export class TaskController {
    
    constructor(private readonly taskService: TaskService){ };

    @Get()
    list_test(){
        return "Rota funcoinando";
    }
    
    @Post()
    create(@Body() task: TaskDto ){
        return this.taskService.create(task);
    }

    @Get("/:id")
    findById(@Param('id') id: string): TaskDto{
        return this.taskService.findById(id);
    }

    @Put()
    update(@Body() task: TaskDto){
        return this.taskService.update(task);
    }
}