import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { OrderItem, OrderItemDocument } from 'src/order-items/schemas/order-item.shema';
import { OrderHistory, OrderHistoryDocument } from 'src/order-history/schemas/order-history.schema';

@Injectable()
export class OrdersService {

  constructor(
    @InjectModel(Order.name)
    private orderModule: SoftDeleteModel<OrderDocument>,

    @InjectModel(OrderItem.name)
    private orderItemModule: SoftDeleteModel<OrderItemDocument>,

    @InjectModel(OrderHistory.name)
    private orderHistoryModule: SoftDeleteModel<OrderHistoryDocument>,
  ){}


  /// function create code order
  createCodeOrder(){
    return `ORD${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
  }

  async createOrderService(createOrderDto: CreateOrderDto) {

    const {orderCode= this.createCodeOrder(), user, address,totalAmount,totalQuantity,orderDate,discountAmount,payment,coupon,shippingStatus,orderStatus,paymentStatus} = createOrderDto;

    // await this.orderModule.create({
    //   orderCode: orderCode,user: user,  
    // })


    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
