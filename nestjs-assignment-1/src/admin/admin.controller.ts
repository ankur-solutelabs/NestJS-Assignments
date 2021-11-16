import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import {AuthGuard} from '@nestjs/passport';
import { School } from './admSchool.entity';
import { Teacher } from './admTeacher.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { GetSchoolFilterDto, GetTeacherFilterDto } from './dto/get-teacher-filter.dto';
import { TeacherValidationPipe } from './pipes/teacher-detail-validation.pipe';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('admin')
@UseGuards(AuthGuard())
export class AdminController {
    constructor (private adminService: AdminService ) {}

    @Get('allteacher')
    getTeachers(
        @Query(ValidationPipe) filterDto : GetTeacherFilterDto,
        @GetUser() user:User,
        ) : Promise<Teacher[]> {
        return this.adminService.getTeachers(filterDto,user);
    }

    @Post('teacher')
    @UsePipes(ValidationPipe)

    createTeacher(
        @Body() createTeacherDto: CreateTeacherDto,
         @GetUser()user: User,
        ): Promise<Teacher> {

       return this.adminService.createTeacher(createTeacherDto,user)

    }

    @Get('teacher/:id')
    getTeacherById(@Param('id',ParseIntPipe) id: number): Promise<Teacher> {
        return this.adminService.getTeacherById(id);
    }
    @Delete('teacher/:id')
    deleteTeacher(@Param('id', ParseIntPipe)id: number): Promise<void>{
        return this.adminService.deleteTeacher(id);
    }

    @Patch('teacher/:id')
    updateTeacherClass(
        @Param('id',ParseIntPipe) id: number,
        @Body('classList', TeacherValidationPipe) classList: string,
    ): Promise<Teacher> {
        return this.adminService.updateTeacherClass(id,classList);
    }




    @Get('allschool')
    getSchools(
        @Query(ValidationPipe) filterSDto : GetSchoolFilterDto,
        @GetUser() user:User,
        ) : Promise<School[]> {
        return this.adminService.getSchools(filterSDto,user);
    }

    @Post('school')
    @UsePipes(ValidationPipe)

    createSchool(
        @Body() createSchoolDto: CreateSchoolDto,
        @GetUser()user: User,
        
        ): Promise<School> {

       return this.adminService.createSchool(createSchoolDto,user)

    }

    @Get('school/:id')
    getSchoolById(@Param('id',ParseIntPipe) id: number): Promise<School> {
        return this.adminService.getSchoolById(id);
    }
    @Delete('school/:id')
    deleteSchool(@Param('id', ParseIntPipe)id: number): Promise<void>{
        return this.adminService.deleteSchool(id);
    }

    @Patch('school/:id')
    updateSchoolClass(
        @Param('id',ParseIntPipe) id: number,
        @Body('contactNo', TeacherValidationPipe) contactNo: number,
    ): Promise<School> {
        return this.adminService.updateSchool(id,contactNo);
    }
}
 