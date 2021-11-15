import { IsNotEmpty, IsOptional } from "class-validator";

export class GetStudentFilterDto {
    @IsOptional()
    inClass : string;

    @IsOptional()
    @IsNotEmpty()
    search : string;

}