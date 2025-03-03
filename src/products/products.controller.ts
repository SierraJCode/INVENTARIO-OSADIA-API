import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @Post()
    async create(@Body() body: Product) {
        return this.productsService.create(body);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return this.productsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.productsService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: Partial<Product>) {
        return this.productsService.update(id, body);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.productsService.remove(id);
    }
}
