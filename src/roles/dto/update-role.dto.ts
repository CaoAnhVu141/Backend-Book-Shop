import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    
    @IsNotEmpty({ message: "Role không được để trống" })
    name: string;

    @IsNotEmpty({ message: "Mô tả không được để trống" })
    description: string;
}
