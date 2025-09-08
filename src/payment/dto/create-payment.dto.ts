import { IsNotEmpty } from "class-validator";

export class CreatePaymentDto {

    @IsNotEmpty({message: "Name không được để trống"})
    name: string;

    @IsNotEmpty({message: "Description không được để trống"})
    description: string;

    @IsNotEmpty({message: "Status không được để trống"})
    status: boolean;

}
