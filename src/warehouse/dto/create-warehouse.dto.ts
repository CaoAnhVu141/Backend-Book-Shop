import { IsNotEmpty } from "class-validator";

export class CreateWarehouseDto {

    @IsNotEmpty({ message: "Nam không được bỏ trống" })
    name: string;

    @IsNotEmpty({ message: "Description không được bỏ trống" })
    description: string;

    @IsNotEmpty({ message: "Location không được bỏ trống" })
    location: string;

    @IsNotEmpty({ message: "Status không được bỏ trống" })
    status: boolean;
}
