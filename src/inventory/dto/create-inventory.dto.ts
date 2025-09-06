import { IsNotEmpty } from "class-validator";

export class CreateInventoryDto {

    @IsNotEmpty({ message: "Book không được để trống" })
    book: string;

    @IsNotEmpty({ message: "Warehouse không được để trống" })
    warehouse: string;

    @IsNotEmpty({ message: "Quantity không được để trống" })
    quantity: number;
}
