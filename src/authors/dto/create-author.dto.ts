import { IsNotEmpty } from "class-validator";

export class CreateAuthorDto {

    @IsNotEmpty({message: "Tên tác giả không được để trống"})
    name: string;

    @IsNotEmpty({message: "Bio tác giả không được để trống"})
    bio: string;

    avatar: string;
    
    is_popular: boolean;

}
