import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TaskController } from './task/task.controller.js';
import { TaskModule } from './task/task.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task/entities/task.entity.js';

@Module({
  imports: [TaskModule,
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: "tasks.sqlite",
      entities: [Task],
      synchronize: true,
    }),
    TaskModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
