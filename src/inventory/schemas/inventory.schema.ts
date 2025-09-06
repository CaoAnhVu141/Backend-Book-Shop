import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type InventoryDocument = HydratedDocument<Inventory>;

@Schema({ timestamps: true })

export class Inventory {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
    book: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse' })
    warehouse: mongoose.Schema.Types.ObjectId;

    @Prop()
    quantity: number;

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
export const InventorySchema = SchemaFactory.createForClass(Inventory);
