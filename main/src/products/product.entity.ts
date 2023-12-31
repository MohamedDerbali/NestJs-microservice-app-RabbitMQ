import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;
@Schema()
export class Product extends Document {
  @Prop()
  libelle: string;
  @Prop()
  like: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
