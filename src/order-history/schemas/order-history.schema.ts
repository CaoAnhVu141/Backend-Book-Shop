import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type OrderHistoryDocument = HydratedDocument<OrderHistory>;

@Schema({ timestamps: true })
export class OrderHistory {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true })
    order: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'] })
    status: string;

    @Prop({ required: true })
    updateDate: Date;

    @Prop()
    note: string;

    @Prop()
    deliveryDate: Date;

}
export const OrderHistorySchema = SchemaFactory.createForClass(OrderHistory);
