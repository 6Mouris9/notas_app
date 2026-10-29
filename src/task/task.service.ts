import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto.js';
@Injectable()
export class TaskService {
    private tasks: TaskDto[] = []; //armazenamento em memoria

    create(task: TaskDto): HttpStatus{
        this.tasks.push(task);
        console.log(this.tasks);
        return HttpStatus.ACCEPTED;
    }
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
            if (params.status !== undefined || t.status.includes(params.status)) {
              match = true;
            }
            return match;
        })
    }
}
