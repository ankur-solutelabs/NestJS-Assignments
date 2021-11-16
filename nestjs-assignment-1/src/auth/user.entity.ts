import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt' 
import { Teacher } from "src/admin/admTeacher.entity";
import { School } from "src/admin/admSchool.entity";
import { Student } from "src/teacher/teachStudent.entity";
@Entity({name:'User'})
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password : string;

    @Column()
    salt: string;

    @OneToMany(type=> Teacher, teacher => teacher.user, { eager:true })
    teachers: Teacher[]

    @OneToMany(type => School, school => school.user, { eager: true} )
    schools: School[]

    @OneToMany(type => Student, student => student.user, {eager:true})
    students: Student[]

    //custome methods to validate password
    async validatePassword( password: string ): Promise<boolean> {
        const hash = await bcrypt.hash(password,this.salt);
        return hash === this.password
    }
}