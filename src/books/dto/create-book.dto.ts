import { isNotEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBookDto {

    @IsNotEmpty({ message: "Tên sách không được để trống" })
    name: string;

    @IsNotEmpty({ message: "Mô tả sách không được để trống" })
    description: string;

    @IsNumber()
    @IsNotEmpty({ message: "Giá sách không được để trống" })
    price: number;

    @IsString({ message: "Tác giá phải một string" })
    @IsNotEmpty({ message: "Tên tác giả sách không được để trống" })
    author: string;

    @IsString({ message: "Tác giá phải một string" })
    @IsNotEmpty({ message: "Danh mục sách không được để trống" })
    category: string;

    @IsNotEmpty({message: "Thumbnail không được để trống"})
    thumbnail: string;

    @IsNotEmpty({message: "Images không được để trống"})
    images: string;
}
