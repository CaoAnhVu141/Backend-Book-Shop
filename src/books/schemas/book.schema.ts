import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type BookDocument = HydratedDocument<Book>

@Schema({ timestamps: true })
export class Book {

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    description: string

    @Prop({required: true})
    price: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author' })
    author: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    category: mongoose.Types.ObjectId;

    @Prop()
    thumbnail: string;

    @Prop()
    images: string[];

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

export const BookSchema = SchemaFactory.createForClass(Book);