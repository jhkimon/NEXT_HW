import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, ProductFactory } from './entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create_product.dto';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = ProductFactory.create(
      createProductDto.name,
      createProductDto.price,
    );

    return await this.productRepository.save(product);
  }

  async findById(productId: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { identifier: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
