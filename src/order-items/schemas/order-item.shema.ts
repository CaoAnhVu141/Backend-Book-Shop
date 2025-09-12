import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type OrderItemDocument = HydratedDocument<OrderItem>;

@Schema({ timestamps: true })
export class OrderItem {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true })
    order: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true })
    book: mongoose.Schema.Types.ObjectId;

    @Prop()
    nameBook: string;

    @Prop({ required: true })
    totalQuantity: number; // số lượng sách

    @Prop({ required: true })
    price: number;

    @Prop({ default: 0 })
    discount: number;

    @Prop({ required: true })
    totalAmount: number;

    @Prop({ default: Date.now })
    createdAt: Date;
}
export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
