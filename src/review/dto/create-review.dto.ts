import { IsNotEmpty } from "class-validator";

export class CreateReviewDto {

    @IsNotEmpty({message: "User không được để trống"})
    user: string;

    @IsNotEmpty({message: "User không được để trống"})
    book: string;

    @IsNotEmpty({message: "Comment không được để trống"})
    comment: string;

    @IsNotEmpty({message: "Rating không được để trống"})
    rating: number;

    images: [{type: string}];

}
