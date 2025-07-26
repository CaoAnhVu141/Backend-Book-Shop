import { Prop } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {

    @IsNotEmpty({message: "Tên danh mục không được để trống"})
    name: string;

    @IsNotEmpty({message: "Mô tả danh mục không được để trống"})
    description: string;
}
