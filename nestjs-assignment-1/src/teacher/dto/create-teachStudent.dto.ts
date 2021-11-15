import { IsNotEmpty } from "class-validator";

export class CreateTeachStudentDto {

    id : number;

    @IsNotEmpty()
    rollNo : number;

    @IsNotEmpty()
    firstName : string;

    @IsNotEmpty()
    lastName : string;

    @IsNotEmpty()
    email : string;

    @IsNotEmpty()
    inClass : string;

}   