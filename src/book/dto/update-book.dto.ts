import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {

    @IsNotEmpty({ message: "Name không được để trống" })
    name: string

    @IsNotEmpty({ message: "Description không được để trống" })
    description: string

    @IsNotEmpty({ message: "Quantity không được để trống" })
    quantity: string

    @IsNotEmpty({ message: "Price không được để trống" })
    price: string
}
