import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { OrderItem, OrderItemSchema } from 'src/order-items/schemas/order-item.shema';
import { Address, AddressSchema } from 'src/address/schemas/address.schema';
import { Payment, PaymentSchema } from 'src/payment/schemas/payment.schema';
import { Coupon, CouponSchema } from 'src/coupon/schemas/coupon.schema';
import { OrderHistory, OrderHistorySchema } from 'src/order-history/schemas/order-history.schema';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: Connection,
      useFactory: (connection: Connection) => connection,
      inject: [getConnectionToken()]
    }
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: User.name, schema: UserSchema },
      { name: OrderItem.name, schema: OrderItemSchema },
      { name: Address.name, schema: AddressSchema },
      { name: Payment.name, schema: PaymentSchema },
      { name: Coupon.name, schema: CouponSchema },
      { name: OrderHistory.name, schema: OrderHistorySchema },
    ])
  ],
})
export class OrdersModule {}