import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @EventPattern('allProductsAdmin')
  async handleAllProductsAdmin(data: Record<string, unknown>) {
    console.log("Products fetching in admin microservice :",data);
  }
  @EventPattern('addProductAdmin')
  async handleAddProductAdmin(data: Record<string, unknown>) {
    console.log("Product added in admin microservice :", data);
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
