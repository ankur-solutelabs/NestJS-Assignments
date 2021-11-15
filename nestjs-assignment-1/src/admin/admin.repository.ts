import { EntityRepository, Repository } from "typeorm";
import { Teacher } from "./admTeacher.entity";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { GetTeacherFilterDto } from "./dto/get-teacher-filter.dto";

@EntityRepository(Teacher)
export class AdTeacherRepository extends Repository<Teacher>{
    async getTeachers(filterDto:GetTeacherFilterDto): Promise<Teacher[]>{
        const {email,search} = filterDto;
        const query = this.createQueryBuilder('teacher');

        if(email){
            query.andWhere('teacher.email = :email',{email});

        }

        if(search){
            query.andWhere('teacher.firstName LIKE :search OR teacher.lastName LIKE :search',{search: `%${search}%`});

        }

       const teacherFS = await query.getMany();
       return teacherFS;
    }


    async createTeacher(createTeacherDto: CreateTeacherDto):Promise<Teacher>{
        const {firstName,
            lastName,
            email, 
            classList,} = createTeacherDto;

        const teacher = new Teacher();
        teacher.firstName = firstName;
        teacher.lastName = lastName;
        teacher.email = email;
        teacher.classList = classList;
        await teacher.save();

        return teacher;
    }


}