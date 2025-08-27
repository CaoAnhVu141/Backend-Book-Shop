import { ArrayNotEmpty, IsArray, IsNotEmpty } from "class-validator";

export class CreateFileExcelDto {

    @ArrayNotEmpty()
    @IsArray()
    data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }[];
}
