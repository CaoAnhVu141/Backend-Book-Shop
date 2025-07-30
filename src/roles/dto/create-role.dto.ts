import { Prop } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";

export class CreateRoleDto {

    @IsNotEmpty({message: "Role không được để trống"})
    name: string;

    @IsNotEmpty({message: "Mô tả không được để trống"})
    description: string;
}
