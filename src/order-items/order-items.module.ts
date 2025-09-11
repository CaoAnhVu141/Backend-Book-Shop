import { Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from 'src/books/schemas/book.schema';
import { Order, OrderSchema } from 'src/orders/schemas/order.schema';
import { OrderItem,OrderItemSchema } from './schemas/order-item.shema';

@Module({
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
  imports: [MongooseModule.forFeature([{ name: OrderItem.name, schema: OrderItemSchema },
      {name: Order.name, schema: OrderSchema},
      {name: Book.name, schema: BookSchema}
    ])],
})
export class OrderItemsModule {}
