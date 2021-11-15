import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}