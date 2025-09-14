import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';

@Injectable()
export class PaymentService {

  constructor(
    @InjectModel(Payment.name)
    private paymentModel: SoftDeleteModel<PaymentDocument>
  ) { }

  async createPaymentService(createPaymentDto: CreatePaymentDto, user: IUser) {
    const { name, description, status } = createPaymentDto;

    const payment = await this.paymentModel.create({
      name, description, status,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });
    return payment;
  }

  async getAllPaymentService(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.paymentModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.paymentModel.find(filter)
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

  async findOnePaymentService(id: string) {
    const payment = await this.paymentModel.findById({_id: id});
    console.log("check payment: ",payment);
    if(!payment || payment.isDeleted){
      throw new BadRequestException("Dữ liệu không tồn tại");
    }
    return payment;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  async removePaymentService(id: string, byUser: IUser) {
    const payment = await this.paymentModel.findOne({_id: id});
    if(!payment || payment.isDeleted){
      throw new BadRequestException("Dữ liệu không tồn tại");
    }
    await this.paymentModel.updateOne({
      _id: id,
    },{
      deletedBy: {
        _id: byUser._id,
        email: byUser.email
      }
    });
    return await this.paymentModel.softDelete({_id: id});
  }
}
