import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { OrderItem, OrderItemDocument } from 'src/order-items/schemas/order-item.shema';
import { OrderHistory, OrderHistoryDocument } from 'src/order-history/schemas/order-history.schema';
import { Connection } from 'mongoose';

@Injectable()
export class OrdersService {

  constructor(
    @InjectModel(Order.name)
    private orderModule: SoftDeleteModel<OrderDocument>,

    @InjectModel(OrderItem.name)
    private orderItemModule: SoftDeleteModel<OrderItemDocument>,

    @InjectModel(OrderHistory.name)
    private orderHistoryModule: SoftDeleteModel<OrderHistoryDocument>,

  ) { }


  /// function create code order
  createCodeOrder() {
    return `ORD${Date.now().toString().substr(-6)}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
  }

  async createOrderService(createOrderDto: CreateOrderDto) {

    const session = await this.orderModule.db.startSession();
    let dataOrders;

    try {

      await session.withTransaction(async () => {
        const { orderCode = this.createCodeOrder(), user, address, orderDate = new Date(), discountAmount, payment, coupon, shippingStatus = 'Not Shipped', orderStatus = 'Pending', paymentStatus, items_order } = createOrderDto;

        /// tính totalAmount and totalQuantity
        let totalAmount = 0;
        let totalQuantity = 0;

        items_order.forEach(item => {
          totalAmount += item.totalAmount
          totalQuantity += item.totalQuantity;
        });

        //discount 
        totalAmount = totalAmount - discountAmount;

        //create table order
        const orders = await this.orderModule.create([{
          orderCode,
          user,
          address,
          orderDate,
          totalAmount,
          totalQuantity,
          payment,
          coupon,
          shippingStatus,
          orderStatus,
          paymentStatus,
        }], { session });

        //create table order_items
        const orderItems = items_order.map(item => ({
          order: orders[0]._id,
          book: item.book,
          nameBook: item.nameBook,
          totalQuantity: item.totalQuantity,
          price: item.price,
          discount: item.discount,
          totalAmount: item.totalAmount,
          createdAt: new Date(),
        }));

        await this.orderItemModule.create(orderItems, { session });

        //create table order_histories
        await this.orderHistoryModule.create([{
          order: orders[0]._id,
          status: orderStatus,
          updateDate: new Date(),
          note: "Thành công tạo đơn hàng",
          deliveryDate: new Date(),
        }], { session });

        dataOrders = {
          success: true,
          order: orders[0],
          message: 'Đặt hàng thành công',
        };
      });
      return dataOrders;
    } catch (error) {
      throw new Error(`Lỗi khi tạo đơn hàng: ${error.message}`);
    }
    finally {
      await session.endSession();
    }
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
