import { Module } from '@nestjs/common';
import { TaskController } from './task.controller.js';
import { TaskService } from './task.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity.js';
import { Tag } from './entities/tag.entity.js';
@Module({
    imports: [TypeOrmModule.forFeature([Task, Tag])],
    controllers: [TaskController],
    providers: [TaskService],
    exports: [TaskService]
})
export class TaskModule {
    
}
