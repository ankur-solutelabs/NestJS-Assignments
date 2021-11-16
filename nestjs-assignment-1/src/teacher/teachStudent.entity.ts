import { type } from "os";
import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'Student'})
export class Student extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rollNo: number;

    @Column()
    firstName : string;

    @Column()
    lastName : string;

    @Column()
    email : string;

    @Column()
    inClass : string;

    @ManyToOne(type => User, user => user.students, {eager:false})
    user:User;


    // @Column()
    // userId: number;


}