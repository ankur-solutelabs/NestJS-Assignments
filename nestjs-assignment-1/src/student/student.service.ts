import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdStudentRepository } from 'src/teacher/teachStd.repository';
import { Student } from 'src/teacher/teachStudent.entity';

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(AdStudentRepository)
        private adStudentRepository:AdStudentRepository,
    ) {}
 
     async getStudentById(id: number): Promise<Student>{
         const found = await this.adStudentRepository.findOne(id);
 
         if(!found) {
             throw new NotFoundException( `Student with id "${id}" not found`);
 
         }
 
         return found;
 
     }
 
  
     async updateStudentClass(id: number, firstName: string,lastName: string):Promise<Student>{
         const student = await this.getStudentById(id);
         student.firstName = firstName;
         student.lastName = lastName
         await student.save();
         return student;
     }
 
}
