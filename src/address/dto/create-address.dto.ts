import { IsNotEmpty, isNotEmpty } from "class-validator";

export class CreateAddressDto {

    @IsNotEmpty({message: "Người dùng không được để trống"})
    user: string;

    @IsNotEmpty({message: "Số nhà không được để trống"})
    homenumber: string;

    @IsNotEmpty({message: "Phường không được để trống"})
    ward: string;

    @IsNotEmpty({message: "Tỉnh thành không được để trống"})
    province: string;

    @IsNotEmpty({message: "Loại địa chỉ không được để trống"})
    type: string;
}
