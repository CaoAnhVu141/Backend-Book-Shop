import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';

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

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
