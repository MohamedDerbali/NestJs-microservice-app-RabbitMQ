import { Module, HttpServer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import './dotenv.config';
import { DataMappingAdapter } from './mapper/DataMappingAdapter';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI, {
      autoCreate: true
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService, DataMappingAdapter],
})
export class AppModule { }
