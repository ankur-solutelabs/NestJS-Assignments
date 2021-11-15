import { IsNotEmpty } from "class-validator";

export class CreateTeacherDto {

    @IsNotEmpty()
    id : number;

    @IsNotEmpty()
    firstName : string;

    @IsNotEmpty()
    lastName : string;

    @IsNotEmpty()
    email : string;

    @IsNotEmpty()
    classList : string;
}   