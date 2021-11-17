import { Body, Controller, Get, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { StudentValidationPipe } from 'src/teacher/pipes/student-details-validation.pipe';
import { Student } from 'src/teacher/teachStudent.entity';
import { StudentService } from './student.service';


@Controller('student')
@UseGuards(AuthGuard())
export class SelfController {
    constructor (private studentService: StudentService ) {}

    @Get('/:id')
    getStudentById(
        @Param('id',ParseIntPipe) id: number,
        @GetUser() user:User,
        
        ): Promise<Student> {
        return this.studentService.getStudentById(id,user);
    }

    @Patch('/:id')
    updateStudentClass(
        @Param('id',ParseIntPipe) id: number,
        @Body('firstName', StudentValidationPipe) firstName: string,
        @Body('lastName', StudentValidationPipe) lastName: string,
        @GetUser() user:User,
    ): Promise<Student> {
        return this.studentService.updateStudentClass(id,firstName,lastName,user);
    }
}
