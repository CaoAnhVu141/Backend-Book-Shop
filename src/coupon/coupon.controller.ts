import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) { }

  @Post()
  @ResponseMessage("Create coupon success")
  createCouponController(@Body() createCouponDto: CreateCouponDto, @User() user: IUser) {
    return this.couponService.createCoponService(createCouponDto, user);
  }

  @Get()
  @ResponseMessage("Fetch list coupon success")
  getAllCouponController(@Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string) {
    return this.couponService.getAllCouponService(+currentPage, +limit, qs);
  }

  @Get(':id')
  @ResponseMessage("Fetch coupon by id success")
  findOneCouponController(@Param('id') id: string) {
    return this.couponService.findOneCouponService(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponService.update(+id, updateCouponDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponService.remove(+id);
  }
}
