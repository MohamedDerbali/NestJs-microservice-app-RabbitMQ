import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/product.entity';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import './dotenv.config';
const ormconfig: TypeOrmModuleOptions = require(path.resolve(__dirname, '..', 'ormconfig.json'));

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([Product])],
  
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService],
})
export class AppModule { }
