import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { ProductsService } from './products/products.service';
import { DataMappingAdapter } from './mapper/DataMappingAdapter';
import { Product } from './products/product.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(DataMappingAdapter) private readonly dataMapper: DataMappingAdapter,
    private readonly productsService: ProductsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @EventPattern('allProductsAdmin')
  async handleAllProductsAdmin(data: Record<string, unknown>) {
    console.log("Products fetching in admin microservice :", data);
  }
  @EventPattern('addProductAdmin')
  async handleAddProductAdmin(data: Record<string, unknown>) {
    const columnNames: string[] = Object.keys(data);
    const mappedColumnNames: Partial<Product> = this.dataMapper.map(columnNames, data);
    console.log("Product added in admin microservice :", mappedColumnNames);
    
    try {
      this.productsService.create(mappedColumnNames);
    }
    catch (e) {
      console.error(e.message);
    }
  }
  @EventPattern('removeProductAdmin')
  async handleRemoveProductAdmin(data: Record<string, unknown>) {
    console.log(`Product with ${data} removed from admin microservice`);
  }
  @EventPattern('error')
  async handleError(data: Record<string, unknown>) {
    console.error("error: ", data);
  }
}
