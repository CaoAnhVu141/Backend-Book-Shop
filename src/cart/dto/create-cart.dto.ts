import { IsNotEmpty } from "class-validator";

export class CreateCartDto {

    @IsNotEmpty()
    user: string;

    @IsNotEmpty()
    book: string;

    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    discount: number;

    @IsNotEmpty()
    totalPrice: number;

}
