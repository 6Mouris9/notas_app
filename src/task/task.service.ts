import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ){}
    
    private tasks: TaskDto[] = []; //armazenamento em memoria

    async create(task: TaskDto): Promise<Task>{
        const newTask = this.taskRepository.create(task);
        return await this.taskRepository.save(newTask);
    }

    /*
    findById(id: string): TaskDto{
        const foundTask = this.tasks.filter(t => t.id === id);
        if(foundTask.length){
            return foundTask[0];
        }
        throw new HttpException(`Not found task with ${id}`, HttpStatus.NOT_FOUND);

    }

    update(task: TaskDto){
        let taskIndex = this.tasks.findIndex(t => t.id === task.id);  
        if(taskIndex >= 0){
            this.tasks[taskIndex] = task;
            return HttpStatus.OK;
        }
        else throw new HttpException(`Task with id ${task.id} not found`, HttpStatus.BAD_REQUEST);
    }

    remove(id: string){
        let taskIndex =  this.tasks.findIndex(t => t.id === id);
        if(taskIndex >= 0){
            this.tasks.splice(taskIndex, 1);
            return HttpStatus.OK;
        }
        else throw new HttpException(`Task with id ${id} not found`, HttpStatus.BAD_REQUEST);

    }

    findAll(params: FindAllParameters): TaskDto[]{
        return this.tasks.filter(t => {
            let match = false;

            if(params.title !== undefined || t.title.includes(params.title)){
                match = true;
            }
            if (params.autor !== undefined || t.autor.includes(params.autor)) {
              match = true;
            }
            return match;
        })
    }
        */
       
}
