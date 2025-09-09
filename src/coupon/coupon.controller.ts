import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { ResponseMessage, Roles, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { RolesGuard } from 'src/guard/roles.guard';

@Controller('coupon')
@UseGuards(RolesGuard)
export class CouponController {
  constructor(private readonly couponService: CouponService) { }

  @Post()
  @Roles("Admin")
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
  @ResponseMessage("Delete coupon success")
  removeCouponController(@Param('id') id: string, @User() user: IUser) {
    return this.couponService.removeCouponService(id, user);
  }
}
