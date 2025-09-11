import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {

    @Prop({ required: true })
    orderCode: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
    address: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
    totalAmount: number; // tổng tiền

    @Prop({ required: true })
    totalQuantity: number;  // tổng số lượng

    @Prop({ required: true })
    orderDate: Date;

    @Prop({ default: 0 })
    discountAmount: number; 

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' })
    payment: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' })
    coupon: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true, enum: ['Not Shipped', 'Shipped', 'In Transit', 'Delivered'] })
    shippingStatus: string;

    @Prop({
        required: true,
        enum: ['Pending', 'Confirmed', 'Shipping', 'Delivered', 'Cancelled'],
        default: 'Pending'
    })
    orderStatus: string;

    @Prop({ required: true, enum: ['Pending', 'Completed', 'Failed'] })
    paymentStatus: string;

    @Prop({ type: Object })
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }

    @Prop({ type: Object })
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }

    @Prop({ type: Object })
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    isDeleted: boolean;

    @Prop()
    deletedAt: Date;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
