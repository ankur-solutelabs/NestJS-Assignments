import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTeachStudentDto } from "./dto/create-teachStudent.dto";
import { GetStudentFilterDto } from "./dto/get-student-filter.dto";
import { Student } from "./teachStudent.entity";

@EntityRepository(Student)
export class AdStudentRepository extends Repository<Student>{
    async getStudents(
        filterDto:GetStudentFilterDto,
        user:User,
        ): Promise<Student[]>{
        const {inClass,search} = filterDto;
        const query = this.createQueryBuilder('student');

        // query.where('student.userId = :userId', {userId:user.id})

        if(inClass){
            query.andWhere('student.inClass = :inClass',{inClass});

        }
        if(search){
            query.andWhere('student.firstName LIKE :search OR student.lastName LIKE :search',{search: `%${search}%`});

        }

       const studentFS = await query.getMany();
       return studentFS;
    }


    async createStudent(
        createStudentDto: CreateTeachStudentDto,
        user:User
        ):Promise<Student>{
        const {
            rollNo,
            firstName,
            lastName,
            email, 
            inClass,
            } = createStudentDto;

        const student = new Student();
        student.rollNo = rollNo;
        student.firstName = firstName;
        student.lastName = lastName;
        student.email = email;
        student.inClass = inClass;
        student.user = user
        await student.save();

        return student;
    }


}