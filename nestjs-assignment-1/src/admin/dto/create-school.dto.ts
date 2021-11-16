import { IsNotEmpty } from "class-validator";

export class CreateSchoolDto {

    id : number;

    @IsNotEmpty()
    schoolName : string;

    @IsNotEmpty()
    schoolCode : string;

    @IsNotEmpty()
    schoolAddress : string;

    @IsNotEmpty()
    contactNo : number;

} 