import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { AdStudentRepository } from 'src/teacher/teachStd.repository';
import { Student } from 'src/teacher/teachStudent.entity';

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(AdStudentRepository)
        private adStudentRepository:AdStudentRepository,
    ) {}
 
     async getStudentById(id: number,
        user:User
        
        ): Promise<Student>{
         const found = await this.adStudentRepository.findOne({where: {id,
            // userId : user.id
        
        }});
 
         if(!found) {
             throw new NotFoundException( `Student with id "${id}" not found`);
 
         }
 
         return found;
 
     }
 
  
     async updateStudentClass(
         id: number, firstName: string,lastName: string,
         user: User,
         
         ):Promise<Student>{
         const student = await this.getStudentById(id,user);
         student.firstName = firstName;
         student.lastName = lastName
         await student.save();
         return student;
     }
 
}
