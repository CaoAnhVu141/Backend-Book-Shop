import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type FavoriteDocument = HydratedDocument<Favorite>

@Schema({ timestamps: true })
export class Favorite {

    @Prop({ type: mongoose.Schema.Types.ObjectId })
    user_id: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId })
    book_id: mongoose.Types.ObjectId;

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
export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
