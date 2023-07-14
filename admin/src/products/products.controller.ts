import { Body, Controller, Get, Param, Post, Put, Delete, Inject } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  private readonly client: ClientProxy;
  constructor(
    private readonly productsService: ProductsService,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_HOST],
        queue: 'main_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }
  @Get()
  async findAll(): Promise<Product[]> {
    const products: Product[] = await this.productsService.findAll();
    this.client.emit('allProducts', products);
    return products;
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() Product: Product): Promise<Product> {
    return this.productsService.create(Product);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() Product: Product): Promise<Product> {
    return this.productsService.update(id, Product);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}
