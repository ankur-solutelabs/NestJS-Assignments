import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
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
 
     async getStudents(
         filterDto: GetStudentFilterDto,
         user:User
         ) :Promise<Student[]> {
         return this.adStudentRepository.getStudents(filterDto,user);
        
     }
 
 
     async getStudentById(id: number,
        user:User,
        
        ): Promise<Student>{
         const found = await this.adStudentRepository.findOne({where: {id,
            // userId: user.id,
        
        }});
 
         if(!found) {
             throw new NotFoundException( `Student with Id "${id}" not found`);
 
         }
 
         return found;
 
     }
 
     async createStudent(
         createStudentDto:CreateTeachStudentDto,
         user:User
         ):Promise<Student>{
         return this.adStudentRepository.createStudent(createStudentDto,user);
     }
 
     async deleteStudent(id: number,
        user:User
        
        ): Promise<void>{
         const found = this.getStudentById(id,user);
         const result = await this.adStudentRepository.delete({id,
            // userId: user.id,
        
        });
         console.log(result)
 
     }
  
     async updateStudentClass(
         id: number,inClass: string,
         user:User,
         
         ):Promise<Student>{
         const student = await this.getStudentById(id,user);
         student.inClass = inClass;
         await student.save();
         return student;
     }
 
  
  
 }
