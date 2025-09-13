import { IsNotEmpty } from "class-validator";

export class CreatePointDto {

    @IsNotEmpty({message: "User không được để trống"})
    user: string;

    order: string

    point: number;

    source: string; // type of coint

    isActive: boolean;

    createdAt: Date;

    updatedAt: Date;
}
