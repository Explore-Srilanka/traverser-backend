import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Reviews extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true, default: 'active', enum: ['active', 'disabled'] })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Places' })
  place_id: string;
}

export const ReviewsSchema = SchemaFactory.createForClass(Reviews);
