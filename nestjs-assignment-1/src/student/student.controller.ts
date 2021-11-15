import { Body, Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { StudentValidationPipe } from 'src/teacher/pipes/student-details-validation.pipe';
import { Student } from 'src/teacher/teachStudent.entity';
import { StudentService } from './student.service';

@Controller('student')
export class SelfController {
    constructor (private studentService: StudentService ) {}

    @Get('/:id')
    getStudentById(@Param('id',ParseIntPipe) id: number): Promise<Student> {
        return this.studentService.getStudentById(id);
    }

    @Patch('/:id')
    updateStudentClass(
        @Param('id',ParseIntPipe) id: number,
        @Body('firstName', StudentValidationPipe) firstName: string,
        @Body('lastName', StudentValidationPipe) lastName: string
    ): Promise<Student> {
        return this.studentService.updateStudentClass(id,firstName,lastName);
    }
}
