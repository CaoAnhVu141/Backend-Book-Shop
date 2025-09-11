import { Module } from '@nestjs/common';
import { OrderHistoryService } from './order-history.service';
import { OrderHistoryController } from './order-history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderHistory,OrderHistorySchema } from './schemas/order-history.schema';
import { Order, OrderSchema } from 'src/orders/schemas/order.schema';

@Module({
  controllers: [OrderHistoryController],
  providers: [OrderHistoryService],
  imports: [MongooseModule.forFeature([{ name: OrderHistory.name, schema: OrderHistorySchema },
        {name: Order.name, schema: OrderSchema},
      ])],
})
export class OrderHistoryModule {}
