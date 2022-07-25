import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps : true})
export class Categories extends Document {

  @Prop({ unique: true , required: true})
  name: string;

}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);

