import { IsString } from "class-validator";

export class CreateFavoriteDto {
    @IsString({message: "Tên người dùng là một chuỗi"})
    user_id: string;

    @IsString({message: "Tên sách là một chuỗi"})
    book_id: string;
}
