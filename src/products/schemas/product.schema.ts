import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    stockActual: number;

    @Prop({ required: true })
    stockMinimo: number;

    @Prop({ required: true })
    stockMaximo: number;

    @Prop({ required: true, enum: ['cerveza', 'vino', 'destilados', 'licor'] })
    category: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
