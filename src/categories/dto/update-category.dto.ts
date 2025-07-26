import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {

    @IsNotEmpty({ message: "Tên danh mục không được để trống" })
    name: string;

    @IsNotEmpty({ message: "Mô tả danh mục không được để trống" })
    description: string;
}
