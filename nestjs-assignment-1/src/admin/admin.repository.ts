import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { School } from "./admSchool.entity";
import { Teacher } from "./admTeacher.entity";
import { CreateSchoolDto } from "./dto/create-school.dto";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { GetSchoolFilterDto, GetTeacherFilterDto } from "./dto/get-teacher-filter.dto";

@EntityRepository(Teacher)
export class AdTeacherRepository extends Repository<Teacher>{
    async getTeachers(
        filterDto:GetTeacherFilterDto,
        user:User
        ): Promise<Teacher[]>{
        const {email,search} = filterDto;
        const query = this.createQueryBuilder('teacher');

        // query.where('teacher.userId = :userId', {userId: user.id})

        if(email){ 
            query.andWhere('teacher.email = :email',{email});

        }

        if(search){
            query.andWhere('teacher.firstName LIKE :search OR teacher.lastName LIKE :search',{search: `%${search}%`});

        }

       const teacherFS = await query.getMany();
       return teacherFS;
    }


    async createTeacher(
        createTeacherDto: CreateTeacherDto,
        user:User,
        ):Promise<Teacher>{
        const {firstName,
            lastName,
            email, 
            classList,} = createTeacherDto;

        const teacher = new Teacher();
        teacher.firstName = firstName;
        teacher.lastName = lastName;
        teacher.email = email;
        teacher.classList = classList;
        teacher.user = user;
        await teacher.save();

        return teacher;
    }

}


@EntityRepository(School)
export class AdSchoolRepository extends Repository<School>{
    async getSchools(
        filterSDto:GetSchoolFilterDto,
        user:User
        ): Promise<School[]>{
        const {schoolCode,search} = filterSDto;
        const query = this.createQueryBuilder('school');

        // query.where('school.userId = :userId', {userId: user.id})

        if(schoolCode){
            query.andWhere('school.schoolCode = :schoolCode',{schoolCode});

        }

        if(search){
            query.andWhere('school.schoolName LIKE :search OR school.schoolName LIKE :search',{search: `%${search}%`});

        }

       const schoolFS = await query.getMany();
       return schoolFS;
    }


    async createSchool(
        createSchoolDto: CreateSchoolDto,
        user:User,
        ):Promise<School>{
        const {
            schoolName,
            schoolCode,
            schoolAddress, 
            contactNo,} = createSchoolDto;

        const school = new School();
        school.schoolName = schoolName;
        school.schoolCode = schoolCode;
        school.schoolAddress = schoolAddress;
        school.contactNo = contactNo;
        school.user = user;
        await school.save();

        return school;
    }
}