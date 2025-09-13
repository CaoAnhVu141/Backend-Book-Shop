import { IsNotEmpty } from "class-validator";

export class CreatePointDto {

    @IsNotEmpty({message: "User không được để trống"})
    user: string;

    @IsNotEmpty({message: "Order không được để trống"})
    order: string

    @IsNotEmpty({message: "Point không được để trống"})
    point: number;

    @IsNotEmpty({message: "Source không được để trống"})
    source: string; // type of coint

    @IsNotEmpty({message: "IsActive không được để trống"})
    isActive: boolean;

    @IsNotEmpty({message: "Created At không được để trống"})
    createdAt: Date;

    updatedAt: Date;
}
