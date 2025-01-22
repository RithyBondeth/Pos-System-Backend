import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@app/common/database/entities/product/product.entity';
import { Not, Repository } from 'typeorm';
import * as path from 'path';
import { UploadfileService } from '@app/common/uploadfile/uploadfile.service';
import { Category } from '@app/common/database/entities/product/category.entity';
import { GetProductDto } from './dtos/get-product.dto';
import { PaginationProductDto } from './dtos/pagination-product.dto';
import { SortProductDto } from './dtos/sort-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { DeleteProductResponseDto } from './dtos/delete-product-response.dto';
import { CountProductQueryParamDto, CountProductResponseDto } from './dtos/count-product.dto';
import { SearchProductRequestDto } from './dtos/search-product-request.dto';
import { SearchProductResponseDto } from './dtos/search-product-response.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private readonly productRepo: Repository<Product>,
        @InjectRepository(Category) private readonly categoryRepo: Repository<Category>, 
        private readonly uploadfileService: UploadfileService,
    ) {}
 
    async findAll(pagination: PaginationProductDto): Promise<GetProductDto[]> {
        try {
            const products = await this.productRepo.find({ 
                relations: ['category'],
                skip: pagination?.skip || 0,
                take: pagination?.limit || 10,
            });
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

    async sortProduct(sort: SortProductDto): Promise<GetProductDto[]> {
        try {
            const products = await this.productRepo.find({
                relations: ['category'],
                order: { [sort.sortBy]: sort.orderBy },
            })
            if(products.length === 0) throw new NotFoundException('There are no products available');

            return products.map((product) => new GetProductDto(product));
        } catch (error) {
            console.error('Failed to sort products: ', error.message);
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
            let category = await this.categoryRepo.findOne({ where: { name: body.category }});
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

    async updateProduct(productId: number, body: UpdateProductDto, image: Express.Multer.File): Promise<GetProductDto> {
        try {
            //Find product by id to ensure if it exists
            const product = await this.productRepo.findOne({
                relations: ['category'],
                where: { id: productId },
            });
            if(!product) {
                if(image) {
                    //Cleanup the product image if it exists
                    const imagePath = path.join(process.cwd(), 'storage/products', image.filename);
                    UploadfileService.deleteFile(imagePath, 'Product Image');
                }
                throw new NotFoundException(`There's no product with id ${productId}`);
            }
            
            //Handle product image
            if(image) {
              if(product.image) {
                //Delete the old product image if it exists
                const oldImagePath = path.join(process.cwd(), 'storage/products', product.image.split('/').pop());
                UploadfileService.deleteFile(oldImagePath, 'Product Image');
              }
              //Save new image
              const imagePath = path.join(process.cwd(), 'storage/products', image.filename);
              product.image = imagePath;
            }  
            
            //Handle product category
            if(body.category) {
                const category = await this.categoryRepo.findOne({ where: { name: body.category }});
                if(!category) throw new NotFoundException(`There is no category ${body.category}. Please ceate a new category first`);

                //Save category
                product.category = category;
            }

            //Update product information dynamically while protecting sensitive fields
            const updatableFields = ['name', 'description', 'price', 'stockQuantity']

            Object.entries(body).forEach(([key, value]) => {
                if(value !== undefined && updatableFields.includes(key)) {
                    product[key] = value || product[value];
                }
            })
            //Save updated product to database
            await this.productRepo.save(product); 

            //Return updated staff
            return new GetProductDto(product);
        } catch (error) {  
            console.error('Failed to update product: ', error.message);
            throw new BadRequestException(error.message);
        }
    }

    async deleteProduct(productId: number): Promise<DeleteProductResponseDto> {
        try {
            //Find product by id to ensure if it exists
            const product = await this.productRepo.findOne({ 
                relations: ['category'],
                where: { id: productId }
            });
            if(!product) throw new NotFoundException(`There's no product with id ${productId}`);

            //Delete product image from database
            if(product.image) {
                const imagePath = path.join(process.cwd(), 'storage/products', product.image.split('/').pop());
                UploadfileService.deleteFile(imagePath, 'Product Image');
            }

            //Delete product from database
            await this.productRepo.remove(product);

            //Return deleted product message
            return new DeleteProductResponseDto({ message: 'Product has been deleted successfully' });
        } catch (error) {
            console.error('Failed to delete product: ', error.message);
            throw new BadRequestException(error.message);
        }
    }

    async countProduct(query: CountProductQueryParamDto): Promise<CountProductResponseDto> {
        try {
            //Find total number of products
            const total = await this.productRepo.count({
                where: {
                    ...(query.category ? { category: { name: query.category } } : {})
                }
            });
            if(total === 0) throw new NotFoundException('There are no products available');
            //Return total number of products
            return new CountProductResponseDto(total);
        } catch (error) {  
            console.error('Failed to count products: ', error.message);
            throw new BadRequestException(error.message);
        }
    }

    async searchProduct(query: SearchProductRequestDto): Promise<SearchProductResponseDto> {
        try {
            const queryBuilder = this.productRepo.createQueryBuilder('product')
                .leftJoinAndSelect('product.category', 'category')
                .skip(query.skip)
                .take(query.limit);
            
            // Add search condition for name or description
            if (query.search) {
                queryBuilder.andWhere(
                    '(LOWER(product.name) LIKE LOWER(:search) OR LOWER(product.description) LIKE LOWER(:search))',
                    { search: `%${query.search}%` }
                );
            }

            // Add price range conditions
            if (query.minPrice !== undefined)
                queryBuilder.andWhere('product.price >= :minPrice', { minPrice: query.minPrice });

            if (query.maxPrice !== undefined) 
                queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice: query.maxPrice });
            
            // Add category filter
            if (query.category) 
                queryBuilder.andWhere('LOWER(category.name) = LOWER(:category)', { category: query.category });
            
            // Add sorting
            const sortField = query.sortBy || 'createdAt';
            const sortOrder = query.orderBy || 'DESC';
            queryBuilder.orderBy(`product.${sortField}`, sortOrder);

            // Execute query
            const [products, total] = await queryBuilder.getManyAndCount();

            if (products.length === 0) throw new NotFoundException('No products found matching your criteria');

            //Return response
            return new SearchProductResponseDto({
                data: products.map(product => new GetProductDto(product)),
                meta: {
                    total,
                    skip: query.skip,
                    limit: query.limit,
                    sortBy: query.sortBy,
                    orderBy: query.orderBy,
                },
            });
        } catch (error) {
            console.error('Failed to search products: ', error.message);
            throw new BadRequestException(error.message);
        }
    }
}
