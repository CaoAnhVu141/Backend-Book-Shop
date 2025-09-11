import { IsNotEmpty } from "class-validator";

export class CreateOrderItemDto {

    @IsNotEmpty({message: "User không được để trống"})
    user: string;

    @IsNotEmpty({message: "Book không được để trống"})
    book: string;

    @IsNotEmpty({message: "Tên sách không được để trống"})
    nameBook: string;

    @IsNotEmpty({message: "Số lượng không được để trống"})
    quantity: number;

    @IsNotEmpty({message: "Giá không được để trống"})
    price: number;


    discount: number;

    @IsNotEmpty({message: "Tổng tiền không được để trống"})
    totalPrice: number;

    @IsNotEmpty({message: "Ngày tạo không được để trống"})
    createdAt: Date;

}
