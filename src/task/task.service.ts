import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity.js';
import { ILike, Repository } from 'typeorm';
import { UpdateResult } from 'typeorm/browser';
import { ObjectId } from 'typeorm/driver/mongodb/bson.typings.js';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  private tasks: TaskDto[] = []; //armazenamento em memoria

  async create(taskDto: TaskDto): Promise<Task> {
    const newTask = this.taskRepository.create(taskDto);
    return await this.taskRepository.save(newTask);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({ relations: { tags: true } });
  }

  async findByTitle(s_title: string): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { title: ILike(`%${s_title}%`) },
      relations: { tags: true },
    });
  }

  async updateById(id: string, taskDto: TaskDto): Promise<Task> {
    const taskresp = await this.taskRepository.preload({
      id: id,
      ...taskDto,
    });

    if (!taskresp) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    }
    return await this.taskRepository.save(taskresp);
  }

  async remove(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    }
  }
}

  


    
