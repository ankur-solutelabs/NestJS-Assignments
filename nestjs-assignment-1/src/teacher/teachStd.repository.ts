import { EntityRepository, Repository } from "typeorm";
import { CreateTeachStudentDto } from "./dto/create-teachStudent.dto";
import { GetStudentFilterDto } from "./dto/get-student-filter.dto";
import { Student } from "./teachStudent.entity";

@EntityRepository(Student)
export class AdStudentRepository extends Repository<Student>{
    async getStudents(filterDto:GetStudentFilterDto): Promise<Student[]>{
        const {inClass,search} = filterDto;
        const query = this.createQueryBuilder('student');

        if(inClass){
            query.andWhere('student.inClass = :inClass',{inClass});

        }
        if(search){
            query.andWhere('student.firstName LIKE :search OR student.lastName LIKE :search',{search: `%${search}%`});

        }

       const studentFS = await query.getMany();
       return studentFS;
    }


    async createStudent(createStudentDto: CreateTeachStudentDto):Promise<Student>{
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
        await student.save();

        return student;
    }


}