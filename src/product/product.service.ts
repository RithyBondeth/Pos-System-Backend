import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@app/common/database/entities/product/product.entity';
import { Repository } from 'typeorm';
import * as path from 'path';
import { UploadfileService } from '@app/common/uploadfile/uploadfile.service';
import { Category } from '@app/common/database/entities/product/category.entity';
import { GetProductDto } from './dtos/get-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private readonly productRepo: Repository<Product>,
        @InjectRepository(Category) private readonly categoryRepo: Repository<Category>, 
        private readonly uploadfileService: UploadfileService,
    ) {}
 
    async findAll(): Promise<GetProductDto[]> {
        try {
            const products = await this.productRepo.find({ relations: ['category'] });
            if(products.length === 0) throw new NotFoundException('There are no products available');

            return products.map((product) => new GetProductDto(product));
        } catch (error) {
            console.error('Failed to find all products: ', error.message);
            throw new BadRequestException(error.message);
        }
    }

    async findOneById(productId: number): Promise<GetProductDto> {
        try {
            const product = await this.productRepo.findOne({ 
                relations: ['category'],
                where: { id: productId }
            });
            if(!product) throw new NotFoundException(`There's no product with id ${productId}`);

            return new GetProductDto(product);
        } catch (error) {  
            console.error('Failed to find product by id: ', error.message);
            throw new BadRequestException(error.message);
        }
    }

    async createProduct(body: CreateProductDto, image: Express.Multer.File): Promise<GetProductDto> {
        try {
            //Find product by name to ensure if it already exists
            let product = await this.productRepo.findOne({ 
                relations: ['category'],
                where: { name: body.name },
            });
            if(product) {
                if(image) {
                    const imagePath = path.join(process.cwd(), 'storage/products', image.filename);
                    UploadfileService.deleteFile(imagePath, 'Product Image');
                }   
                throw new ConflictException(`Product with ${body.name} is already exists`);
            }

            //Find category by name to ensure if it already exists
            let category = await this.categoryRepo.findOne({ where: { name: body.name }});
            if(!category) {
                //Create a new category if it doesn't exist
                category = this.categoryRepo.create({ name: body.category });
                await this.categoryRepo.save(category);
            } 

            //Handle product image
            const productImage = this.uploadfileService.getUploadFile('products', image);

            //Create new product
            product = this.productRepo.create({
                name: body.name,
                description: body.description,
                image: productImage,
                category: category,
                price: body.price,
                stockQuantity: body.stockQuantity,
            });
            await this.productRepo.save(product);

            return new GetProductDto(product);
        } catch (error) {
            console.error('Failed to create product: ', error.message);
            throw new BadRequestException(error.message);
        }
    }
}
