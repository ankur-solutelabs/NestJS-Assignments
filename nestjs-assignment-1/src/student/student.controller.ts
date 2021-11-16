import { Body, Controller, Get, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import { StudentValidationPipe } from 'src/teacher/pipes/student-details-validation.pipe';
import { Student } from 'src/teacher/teachStudent.entity';
import { StudentService } from './student.service';


@Controller('student')
@UseGuards(AuthGuard())
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
