import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AdminController } from './admin.controller';
import { AdSchoolRepository, AdTeacherRepository } from './admin.repository';
import { AdminService } from './admin.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([AdTeacherRepository]),
    TypeOrmModule.forFeature([AdSchoolRepository]),
    AuthModule,
     
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
