import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type PointDocument = HydratedDocument<Point>;

@Schema({ timestamps: true })
export class Point {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: false  })
    order: mongoose.Schema.Types.ObjectId | null;

    @Prop({ required: true })
    point: number;

    @Prop({ required: true })
    source: string; // type of coint

    @Prop({ required: true })
    isActive: boolean;

    @Prop({ required: true })
    createdAt: Date;

    @Prop({ required: true })
    updatedAt: Date;
}
export const PointSchema = SchemaFactory.createForClass(Point);
