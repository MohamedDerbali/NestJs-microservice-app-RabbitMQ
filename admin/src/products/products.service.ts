import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private readonly productsRepository: Repository<Product>) { }
    async findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    async findOne(id: number): Promise<Product> {
        const options: FindOneOptions<Product> = { where: { id } };
        return this.productsRepository.findOne(options);
    }

    async create(Product: Product): Promise<Product> {
        return this.productsRepository.save(Product);
    }

    async update(id: number, updatedProduct: Partial<Product>): Promise<Product> {
        const options: FindOneOptions<Product> = { where: { id } };
        return this.productsRepository.update(id, updatedProduct)
            .then(() => this.productsRepository.findOne(options));
    }

    async remove(id: number): Promise<void> {
        return this.productsRepository.delete(id).then(() => undefined);
    }
}
