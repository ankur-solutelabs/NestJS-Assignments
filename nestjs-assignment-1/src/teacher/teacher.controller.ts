import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTeachStudentDto } from './dto/create-teachStudent.dto';
import { GetStudentFilterDto } from './dto/get-student-filter.dto';
import { StudentValidationPipe } from './pipes/student-details-validation.pipe';
import { TeacherService } from './teacher.service';
import { Student } from './teachStudent.entity';
import {AuthGuard} from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('teacher')
@UseGuards(AuthGuard())
export class StudentController {
    constructor (private teacherService: TeacherService ) {}

    @Get('allstudent')
    getStudents(
        @Query(ValidationPipe) filterDto : GetStudentFilterDto,
        @GetUser() user:User
        ) : Promise<Student[]> {
        return this.teacherService.getStudents(filterDto,user);
    }

    @Post('student')

    @UsePipes(ValidationPipe)

    createStudent(
        @Body() createStudentDto: CreateTeachStudentDto,
        @GetUser() user: User,
        
        ): Promise<Student> {

       return this.teacherService.createStudent(createStudentDto,user)

    }

    @Get('student/:id')
    getStudentById(@Param('id',ParseIntPipe) id: number): Promise<Student> {
        return this.teacherService.getStudentById(id);
    }
    @Delete('student/:id')
    deleteStudent(@Param('id', ParseIntPipe)id: number): Promise<void>{
        return this.teacherService.deleteStudent(id);
    }

    @Patch('student/:id')
    updateStudentClass(
        @Param('id',ParseIntPipe) id: number,
        @Body('inClass', StudentValidationPipe) inClass: string,
    ): Promise<Student> {
        return this.teacherService.updateStudentClass(id,inClass);
    }
}

