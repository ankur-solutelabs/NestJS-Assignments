import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeachStudentDto } from './dto/create-teachStudent.dto';
import { GetStudentFilterDto } from './dto/get-student-filter.dto';
import { AdStudentRepository } from './teachStd.repository';
import { Student } from './teachStudent.entity';

@Injectable()
export class TeacherService {
    constructor(
        @InjectRepository(AdStudentRepository)
        private adStudentRepository:AdStudentRepository,
    ) {}
 
     async getStudents(filterDto: GetStudentFilterDto) :Promise<Student[]> {
         return this.adStudentRepository.getStudents(filterDto);
        
     }
 
 
     async getStudentById(id: number): Promise<Student>{
         const found = await this.adStudentRepository.findOne(id);
 
         if(!found) {
             throw new NotFoundException( `Teacher with Id "${id}" not found`);
 
         }
 
         return found;
 
     }
 
     async createStudent(createStudentDto:CreateTeachStudentDto):Promise<Student>{
         return this.adStudentRepository.createStudent(createStudentDto);
     }
 
     async deleteStudent(id: number): Promise<void>{
         const found = this.getStudentById(id);
         const result = await this.adStudentRepository.delete(id);
         console.log(result)
 
     }
  
     async updateStudentClass(id: number,inClass: string):Promise<Student>{
         const student = await this.getStudentById(id);
         student.inClass = inClass;
         await student.save();
         return student;
     }
 
  
  
 }
