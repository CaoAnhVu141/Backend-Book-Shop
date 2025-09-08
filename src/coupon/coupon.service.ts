import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Coupon, CouponDocument } from './schemas/coupon.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class CouponService {

  constructor(
    @InjectModel(Coupon.name)
    private couponModule: SoftDeleteModel<CouponDocument>
  ) { }

  async createCoponService(createCouponDto: CreateCouponDto, user: IUser) {
    const {name, code, discounType, discounValue, startDate, endDate, status} = createCouponDto;
    const coupon = await this.couponModule.create({
      name, code, discounType,discounValue,startDate,endDate,status,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });
    return coupon;
  }

  findAll() {
    return `This action returns all coupon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coupon`;
  }

  update(id: number, updateCouponDto: UpdateCouponDto) {
    return `This action updates a #${id} coupon`;
  }

  remove(id: number) {
    return `This action removes a #${id} coupon`;
  }
}
