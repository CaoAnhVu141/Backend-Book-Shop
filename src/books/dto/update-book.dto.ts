import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {

    @IsNotEmpty({ message: "Tên sách không được để trống" })
    name: string;

    @IsNotEmpty({ message: "Mô tả sách không được để trống" })
    description: string;

    @IsNumber()
    @IsNotEmpty({ message: "Giá sách không được để trống" })
    price: number;


    @IsString({ message: "Tác giá phải một string" })
    @IsNotEmpty({ message: "Tên tác giả sách không được để trống" })
    author_id: string;

    @IsString({ message: "Tác giá phải một string" })
    @IsNotEmpty({ message: "Danh mục sách không được để trống" })
    category_id: string;
}
