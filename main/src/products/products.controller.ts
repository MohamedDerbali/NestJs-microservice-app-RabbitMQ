import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { HttpService } from '@nestjs/axios';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly httpService: HttpService
  ) { }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  async create(@Body() product: Product): Promise<Product> {
    return this.productsService.create(product);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    return this.productsService.update(id, product);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(id);
  }

  @Post(':idM/:idS/like')
  async like(@Param('idM') idM: string, @Param('idS') idS: number): Promise<Product> {
    const checkIfProductExists: Product = await this.productsService.findOne(idM);
    if (checkIfProductExists) {
      checkIfProductExists.like++;
      this.httpService.post(`http://localhost:5001/api/products/${idS}/like`).subscribe(
        (response) => console.log("Like added on both microservices"),
      );
      const product: Product = await this.productsService.update(idM, checkIfProductExists);
      return product;
    }
  }
}
