import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Teacher } from './admTeacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
// import { Teacher } from './teacher.model';

@Controller('admin')
export class AdminController {
    constructor (private adminService:AdminService ) {}

    @Get()
    getAllTeachers() {
        return this.adminService.getAllTeachers();
    }

    @Post()
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

    @Patch()
    updateTeacherClass(
        @Param('id',ParseIntPipe) id: number,
        @Body('classList') classList: string,
    ): Promise<Teacher> {
        return this.adminService.updateTeacherClass(id,classList);
    }
}
 