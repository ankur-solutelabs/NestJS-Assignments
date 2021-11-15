import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdStudentRepository } from 'src/teacher/teachStd.repository';
import { SelfController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([AdStudentRepository])
     
  ],
  controllers: [SelfController],
  providers: [StudentService]
})
export class StudentModule {}
