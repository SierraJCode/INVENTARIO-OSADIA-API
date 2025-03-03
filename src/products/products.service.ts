import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) { }

    async create(body: Product): Promise<Product> {
        const newProduct = new this.productModel(body);
        return await newProduct.save();
    }

    async findAll(): Promise<Product[]> {
        return await this.productModel.find().exec();
    }

    async findOne(id: string): Promise<Product | null> {
        return await this.productModel.findOne({ id }).exec();
    }

    async update(id: string, updateData: Partial<Product>): Promise<Product | null> {
        return await this.productModel.findOneAndUpdate({ id }, updateData, { new: true }).exec();
    }

    async remove(id: string): Promise<Product | null> {
        return await this.productModel.findOneAndDelete({ id }).exec();
    }
}
