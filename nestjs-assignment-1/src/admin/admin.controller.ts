import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Teacher } from './admTeacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { GetTeacherFilterDto } from './dto/get-teacher-filter.dto';
import { TeacherValidationPipe } from './pipes/teacher-detail-validation.pipe';
// import { Teacher } from './teacher.model';

@Controller('admin')
export class AdminController {
    constructor (private adminService: AdminService ) {}

    @Get()
    getTeachers(@Query(ValidationPipe) filterDto : GetTeacherFilterDto) : Promise<Teacher[]> {
        return this.adminService.getTeachers(filterDto);
    }

    @Post()
    @UsePipes(ValidationPipe)

    createTeacher(@Body() createTeacherDto: CreateTeacherDto): Promise<Teacher> {

       return this.adminService.createTeacher(createTeacherDto)

    }

    @Get('/:id')
    getTeacherById(@Param('id',ParseIntPipe) id: number): Promise<Teacher> {
        return this.adminService.getTeacherById(id);
    }
    @Delete('/:id')
    deleteTeacher(@Param('id', ParseIntPipe)id: number): Promise<void>{
        return this.adminService.deleteTeacher(id);
    }

    @Patch('/:id')
    updateTeacherClass(
        @Param('id',ParseIntPipe) id: number,
        @Body('classList', TeacherValidationPipe) classList: string,
    ): Promise<Teacher> {
        return this.adminService.updateTeacherClass(id,classList);
    }
}
 