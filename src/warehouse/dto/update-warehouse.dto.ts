import { PartialType } from '@nestjs/mapped-types';
import { CreateWarehouseDto } from './create-warehouse.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateWarehouseDto extends PartialType(CreateWarehouseDto) {

    @IsNotEmpty({ message: "Nam không được bỏ trống" })
    name: string;

    @IsNotEmpty({ message: "Description không được bỏ trống" })
    description: string;

    @IsNotEmpty({ message: "Location không được bỏ trống" })
    location: string;

    @IsNotEmpty({ message: "Status không được bỏ trống" })
    status: boolean;
}
