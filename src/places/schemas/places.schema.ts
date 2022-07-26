import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Reviews } from '@/reviews/schemas/reviews.schema';

@Schema({ timestamps: true, versionKey: false})
export class Places extends Document {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop()
  slug: string;

  @Prop({ required: true })
  latitude: string;

  @Prop({ required: true })
  longitude: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop({ type: Types.ObjectId, ref: 'Categories' })
  category_id: string;

  @Prop({ type: [Types.ObjectId], ref: 'Reviews' })
  reviews: Reviews[]
}

export const PlacesSchema = SchemaFactory.createForClass(Places);
