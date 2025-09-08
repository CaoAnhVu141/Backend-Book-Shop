import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type CouponDocument = HydratedDocument<Coupon>

@Schema({ timestamps: true })
export class Coupon {

    @Prop()
    name: string;

    @Prop()
    discounType: string;

    @Prop()
    discounValue: string;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop()
    status: boolean;

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
export const CounponSchema = SchemaFactory.createForClass(Coupon);