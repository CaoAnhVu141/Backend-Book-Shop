import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Coupon, CouponDocument } from './schemas/coupon.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import { start } from 'repl';

@Injectable()
export class CouponService {

  constructor(
    @InjectModel(Coupon.name)
    private couponModule: SoftDeleteModel<CouponDocument>
  ) { }

  async createCoponService(createCouponDto: CreateCouponDto, user: IUser) {
    const {name, code, discounType, discounValue, startDate, endDate, status} = createCouponDto;
    const currentDay = new Date();
    const checkStartDay = new Date(startDate);
    const checkEndDate = new Date(endDate);
    if(checkStartDay < currentDay)
    {
      throw new BadRequestException("Ngày tạo phải lớn hơn hoặc bằng ngày hiện tại");
    }
    if(checkStartDay > checkEndDate){
      throw new BadRequestException("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
    }
    const coupon = await this.couponModule.create({
      name, code, discounType,discounValue,startDate,endDate,status,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });
    return coupon;
  }

  async getAllCouponService(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.couponModule.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.couponModule.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec();

    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        pages: totalPages,
        total: totalItems
      },
      result
    }
  }

  async findOneCouponService(id: string) {
    const coupon = await this.couponModule.findById({_id: id});
    if(!coupon || coupon.isDeleted){
      throw new NotFoundException("Dữ liệu không tồn tại");
    } 
    return coupon;
  }

  update(id: number, updateCouponDto: UpdateCouponDto) {
    return `This action updates a #${id} coupon`;
  }

  remove(id: number) {
    return `This action removes a #${id} coupon`;
  }
}
