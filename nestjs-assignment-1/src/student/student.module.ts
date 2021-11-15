import { Module } from '@nestjs/common';
import { SelfController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  controllers: [SelfController],
  providers: [StudentService]
})
export class StudentModule {}
