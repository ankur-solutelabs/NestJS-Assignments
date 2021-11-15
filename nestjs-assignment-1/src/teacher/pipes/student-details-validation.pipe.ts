import { PipeTransform } from "@nestjs/common";

export class StudentValidationPipe implements PipeTransform {
    transform (value: any) {
       

        return value;
    }
}