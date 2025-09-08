import { IsNotEmpty } from "class-validator";

export class CreateCouponDto {

    @IsNotEmpty({message: "Name không được để trống"})
    name: string;

    @IsNotEmpty({message: "Code không được để trống"})
    code: string;

    @IsNotEmpty({message: "Name không được để trống"})
    discounType: string;

    @IsNotEmpty({message: "discounValue không được để trống"})
    discounValue: number;

    @IsNotEmpty({message: "startDate không được để trống"})
    startDate: Date;

    @IsNotEmpty({message: "endDate không được để trống"})
    endDate: Date;

    @IsNotEmpty({message: "Status không được để trống"})
    status: boolean;
}
