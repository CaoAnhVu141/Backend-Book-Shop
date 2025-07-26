import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
export type AuthorDocument = HydratedDocument<Author>

@Schema({ timestamps: true })
export class Author {

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    bio: string;

    @Prop()
    avatar: string;

    @Prop()
    is_popular: boolean;

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

export const AuthorSchema = SchemaFactory.createForClass(Author);
