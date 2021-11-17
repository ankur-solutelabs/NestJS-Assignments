import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AdStudentRepository } from 'src/teacher/teachStd.repository';
import { SelfController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([AdStudentRepository]),
    AuthModule,
     
  ],
  controllers: [SelfController],
  providers: [StudentService]
})
export class StudentModule {}
