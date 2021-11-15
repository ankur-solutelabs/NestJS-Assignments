import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { AdStudentRepository } from './teachStd.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([AdStudentRepository])
     
  ],
  controllers: [StudentController],
  providers: [TeacherService]
})
export class TeacherModule {}
