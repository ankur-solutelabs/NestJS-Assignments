import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdTeacherRepository } from './admin.repository';
import { Teacher } from './admTeacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { GetTeacherFilterDto } from './dto/get-teacher-filter.dto';
@Injectable()
export class AdminService {
   constructor(
       @InjectRepository(AdTeacherRepository)
       private adTeacherRepository:AdTeacherRepository,
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

 
 
}
//going to add validation