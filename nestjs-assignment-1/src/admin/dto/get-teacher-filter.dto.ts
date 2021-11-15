import { IsNotEmpty, IsOptional } from "class-validator";

export class GetTeacherFilterDto {
    @IsOptional()
    email : string;

    @IsOptional()
    @IsNotEmpty()
    search : string;

}

export class GetSchoolFilterDto {
    @IsOptional()
    schoolCode : string;

    @IsOptional()
    @IsNotEmpty()
    search : string;

}