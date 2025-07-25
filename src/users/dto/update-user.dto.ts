import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsNotEmpty({ message: "Name không được để trống" })
    name: string;

    @IsNotEmpty({ message: "Email không được để trống" })
    email: string;

    @IsNotEmpty({ message: "Age không được để trống" })
    age: number;

    @IsNotEmpty({ message: "Gender không được để trống" })
    gender: string;
}
