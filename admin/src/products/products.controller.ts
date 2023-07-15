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
        urls: [process.env.RMQ_LOCALHOST],
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
    this.client.emit('allProductsAdmin', products);
    return products;
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  async create(@Body() Product: Product): Promise<Product> {
    const product: Product = await this.productsService.create(Product);
    this.client.emit('addProductAdmin', product);
    return product;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() Product: Product): Promise<Product> {
    return this.productsService.update(id, Product);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<String> {
    try {
      const checkIfProductExists: Product = await this.productsService.findOne(id);
      if (!checkIfProductExists) throw new Error("Product not found");
      await this.productsService.remove(id);
      this.client.emit('removeProductAdmin', id);
      return "Product removed successfully";
    } catch (e) {
      this.client.emit('error', e.message);
      return "Product not found";
    }
  }

  @Post(':id/like')
  async like(@Param('id') id: number): Promise<Product> {
    const checkIfProductExists: Product = await this.productsService.findOne(id);
    if (checkIfProductExists) {
      const product: Product = await this.productsService.update(id, {
        like: checkIfProductExists.like + 1,
      });
      return product;
    }
  }
}
