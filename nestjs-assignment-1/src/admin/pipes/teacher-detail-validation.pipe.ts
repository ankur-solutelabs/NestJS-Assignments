import { PipeTransform } from "@nestjs/common";

export class TeacherValidationPipe implements PipeTransform {
    transform (value: any) {
       

        return value;
    }
}