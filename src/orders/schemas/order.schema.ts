import { Prop } from "@nestjs/mongoose";
import mongoose from "mongoose";

export class Order {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
    book: mongoose.Schema.Types.ObjectId;

    @Prop()
    totalAmount: number;

    totalQuantity: number;

    orderDate: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' })
    payment: mongoose.Schema.Types.ObjectId;
}
