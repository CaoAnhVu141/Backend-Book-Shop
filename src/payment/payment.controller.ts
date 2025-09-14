import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post()
  @ResponseMessage("Create payment success")
  createPaymentController(@Body() createPaymentDto: CreatePaymentDto, @User() user: IUser) {
    return this.paymentService.createPaymentService(createPaymentDto, user);
  }

  @Get()
  @ResponseMessage("Fetch list payment success")
  getAllPaymentController(@Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string) {
    return this.paymentService.getAllPaymentService(+currentPage, +limit, qs);
  }

  @Get(':id')
  @ResponseMessage("Fetch payment by id success")
  findOnePaymentController(@Param('id') id: string) {
    return this.paymentService.findOnePaymentService(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  @ResponseMessage("Delete payment success")
  removePaymentController(@Param('id') id: string, @User() user: IUser) {
    return this.paymentService.removePaymentService(id, user);
  }
}
