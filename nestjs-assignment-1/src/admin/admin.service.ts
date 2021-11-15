import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdSchoolRepository, AdTeacherRepository } from './admin.repository';
import { School } from './admSchool.entity';
import { Teacher } from './admTeacher.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { GetSchoolFilterDto, GetTeacherFilterDto } from './dto/get-teacher-filter.dto';
@Injectable()
export class AdminService {
   constructor(
       @InjectRepository(AdTeacherRepository)
       private adTeacherRepository:AdTeacherRepository,
       @InjectRepository(AdSchoolRepository)
       private adSchoolRepository:AdSchoolRepository,
   ) {}

    async getTeachers(filterDto: GetTeacherFilterDto) :Promise<Teacher[]> {
        return this.adTeacherRepository.getTeachers(filterDto);
       
    }


    async getTeacherById(id: number): Promise<Teacher>{
        const found = await this.adTeacherRepository.findOne(id);

        if(!found) {
            throw new NotFoundException( `Teacher with Id "${id}" not found`);

        }

        return found;

    }

    async createTeacher(createTeacherDto:CreateTeacherDto):Promise<Teacher>{
        return this.adTeacherRepository.createTeacher(createTeacherDto);
    }

    async deleteTeacher(id: number): Promise<void>{
        const found = this.getTeacherById(id);
        const result = await this.adTeacherRepository.delete(id);
        console.log(result)

    }
 
    async updateTeacherClass(id: number,classList: string):Promise<Teacher>{
        const teacher = await this.getTeacherById(id);
        teacher.classList = classList;
        await teacher.save();
        return teacher;
    }

 async getSchools(filterSDto: GetSchoolFilterDto) :Promise<School[]> {
     return this.adSchoolRepository.getSchools(filterSDto);
    
 }


 async getSchoolById(id: number): Promise<School>{
     const found = await this.adSchoolRepository.findOne(id);

     if(!found) {
         throw new NotFoundException( `School with Id "${id}" not found`);

     }

     return found;

 }

 async createSchool(createSchoolDto: CreateSchoolDto):Promise<School>{
     return this.adSchoolRepository.createSchool(createSchoolDto);
 }

 async deleteSchool(id: number): Promise<void>{
     const found = this.getSchoolById(id);
     const result = await this.adSchoolRepository.delete(id);
     console.log(result)

 }

 async updateSchool(id: number,contactNo: number):Promise<School>{
     const school = await this.getSchoolById(id);
     school.contactNo = contactNo;
     await school.save();
     return school;
 }
 
 
}
