import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TaskController } from './task/task.controller.js';

@Module({
  imports: [],
  controllers: [AppController, TaskController],
  providers: [AppService],
})
export class AppModule {}
