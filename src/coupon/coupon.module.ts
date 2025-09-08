import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Coupon,CouponSchema } from './schemas/coupon.schema';

@Module({
  controllers: [CouponController],
  providers: [CouponService],
  imports: [MongooseModule.forFeature([{ name: Coupon.name, schema: CouponSchema }])],
  
})
export class CouponModule {}
