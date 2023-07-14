import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/product.entity';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
const isDevelopment = process.env.NODE_ENV === 'development';
@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'productsManagement',
      entities: [Product],
      synchronize: isDevelopment,
    }),
    TypeOrmModule.forFeature([Product])],
    
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService],
})
export class AppModule { }
