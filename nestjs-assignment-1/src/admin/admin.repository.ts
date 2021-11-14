import { EntityRepository, Repository } from "typeorm";
import { Teacher } from "./admTeacher.entity";
import { CreateTeacherDto } from "./dto/create-teacher.dto";

@EntityRepository(Teacher)
export class AdTeacherRepository extends Repository<Teacher>{
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