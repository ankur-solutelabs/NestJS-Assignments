import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'Teacher'})
export class Teacher extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName : string;

    @Column()
    lastName : string;

    @Column()
    email : string;

    @Column()
    classList : string;

    @ManyToOne(type => User, user => user.teachers, {eager: false})
    user:User;

    // @Column()
    // userId: number;

}