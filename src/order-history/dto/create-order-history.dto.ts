import { IsNotEmpty } from "class-validator";

export class CreateOrderHistoryDto {

    @IsNotEmpty({message: "Order không được để trống"})
    order: string;

    @IsNotEmpty({message: "Status không được để trống"})
    status: string;

    @IsNotEmpty({message: "Ngày cập nhật không được để trống"})
    updateDate: Date;

    note: string;

    @IsNotEmpty({message: "Ngày giao không được để trống"})
    deliveryDate: Date;
}
