import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity.js';
import { Repository } from 'typeorm';
import { UpdateResult } from 'typeorm/browser';
import { ObjectId } from 'typeorm/driver/mongodb/bson.typings.js';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  private tasks: TaskDto[] = []; //armazenamento em memoria

  async create(task: TaskDto): Promise<Task> {
    const newTask = this.taskRepository.create(task);
    return await this.taskRepository.save(newTask);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({ relations: { tags: true } });
  }

  async findByTitle(s_title: string): Promise<Task[]> {
    const result = this.taskRepository.find({
      where: { title: s_title },
      relations: { tags: true },
    });
    return await result;
  }

  async updateById(id: string, task: TaskDto): Promise<UpdateResult> {
        return await this.taskRepository.update(id , { 
            title: task.title,
            autor: task.autor,
            content: task.content,
            tags: task.tags,
            creationDate: task.creationDate,
        });
    
  }
}

    
    
    /*
  

  remove(id: string) {
    let taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
      return HttpStatus.OK;
    } else
      throw new HttpException(
        `Task with id ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );

      }
      
}
      */
