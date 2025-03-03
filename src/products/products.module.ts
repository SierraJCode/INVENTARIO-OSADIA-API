import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from './schemas/product.schema';
import { JwtModule } from '@nestjs/jwt'; // <-- Agregar esto
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    AuthModule, // <-- Importar AuthModule aquí
    JwtModule.register({
      secret: 'secreto', // Usa variables de entorno en producción
      signOptions: { expiresIn: '1h' },
    }),
  ], controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }
