import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'School'})
export class School extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    schoolName : string;

    @Column()
    schoolCode : string;

    @Column()
    schoolAddress : string;

    @Column()
    contactNo : number;
    
    @ManyToOne(type => User, user => user.schools, {eager: false})
    user:User;


    // @Column()
    // userId: number;
}