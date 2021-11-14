import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdTeacherRepository } from './admin.repository';
import { Teacher } from './admTeacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
@Injectable()
export class AdminService {
   constructor(
       @InjectRepository(AdTeacherRepository)
       private adTeacherRepository:AdTeacherRepository,
   ) {}

    getAllTeachers() {
        // return this.teachers;
    }


    async getTeacherById(id: number): Promise<Teacher>{
        const found = await this.adTeacherRepository.findOne(id);

        return found

    }

    async createTeacher(createTeacherDto:CreateTeacherDto):Promise<Teacher>{
        return this.adTeacherRepository.createTeacher(createTeacherDto);
    }

    async deleteTeacher(id: number): Promise<void>{
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