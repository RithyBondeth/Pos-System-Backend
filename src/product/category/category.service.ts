import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '@app/common/database/entities/product/category.entity';
import { UploadfileService } from '@app/common/uploadfile/uploadfile.service';
import * as path from 'path';
import { GetCategoryDto } from './dtos/get-category.dto';
import { PaginationCategoryDto } from './dtos/pagination-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { DeleteCategoryRepsonseDto } from './dtos/delete-category-response.dto';
import { Product } from '@app/common/database/entities/product/product.entity';
import { query } from 'express';
import { SortCategoryDto } from './dtos/sort-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category) private readonly categoryRepo: Repository<Category>,
        @InjectRepository(Product) private readonly productRepo: Repository<Product>,
        private readonly uploadfileService: UploadfileService, 
    ) {}

    async findAll(pagination: PaginationCategoryDto): Promise<GetCategoryDto[]> {
        try {  
            const categories = await this.categoryRepo.find({
                skip: pagination?.skip || 0,
                take: pagination?.limit || 10,
            });
            if(categories.length === 0) throw new NotFoundException('There are no categories available');
            return categories.map((category) => new GetCategoryDto(category));
        } catch (error) {
            console.error('Failed to find all categories: ', error.message);
            throw new BadRequestException(error.message);
        }
    }

    async findOneById(categoryId: number): Promise<GetCategoryDto> {
        try {
            const category = await this.categoryRepo.findOne({ where: { id: categoryId }});
            if(!category) throw new NotFoundException(`There is no category with id ${categoryId}`);
            return new GetCategoryDto(category);
        } catch (error) {
            console.error('Failed to find category: ', error.message);
            throw new NotFoundException(`There is no category with id ${categoryId}`);
        }
    }

    async sortCategory(query: SortCategoryDto): Promise<GetCategoryDto[]> {
        try {
            const categories = await this.categoryRepo.find({
                order: { [query.sortBy]: query.orderBy }
            });
            if(categories.length === 0) throw new NotFoundException('There are no categories available');
            return categories.map((category) => new GetCategoryDto(category));
        } catch (error) {
            console.error('Failed to sort category: ', error.message);
            throw new BadRequestException(error.message);
        }
    }

    async createCategory(body: CreateCategoryDto, image: Express.Multer.File): Promise<GetCategoryDto> {
        try {
            //Find category by name if it exists
            let category = await this.categoryRepo.findOne({ where: { name: body.name } });
            if(category) {
                if(image) {
                    //Clean up category image if it exists
                    const imagePath = path.join(process.cwd(), 'storage/categories', image.filename);
                    UploadfileService.deleteFile(imagePath, 'Category Image');
                }  
                throw new ConflictException(`Category ${body.name} already exists`);
            }
            
            //Handle category image
            const categoryImage = this.uploadfileService.getUploadFile('categories', image);
            
            //Create a new category
            category = this.categoryRepo.create({
                ...body,
                image: categoryImage
            });
            await this.categoryRepo.save(category);

            return new GetCategoryDto(category);
        } catch (error) {
            console.error('Failed to create category: ', error.message);
            throw new BadRequestException(error.message);
        }
    }

    async updateCategory(categoryId: number, body: UpdateCategoryDto, image: Express.Multer.File): Promise<GetCategoryDto> {
        try {
            let category = await this.categoryRepo.findOne({ where: { id: categoryId }});
            if(!category) {
                if(image) {
                    //Clean up category image if it exists
                    const imagePath = path.join(process.cwd(), 'storage/categories', image.filename);
                    UploadfileService.deleteFile(imagePath, 'Category Image');
                }
                throw new NotFoundException(`There is no category with id ${categoryId}`);
            }
            //Handle updated category image
            if(image) {
                if(category.image) {
                    //Delete the old category image if it exists
                    const oldImagePath = path.join(process.cwd(),'storage/categories', category.image.split('/').pop());
                    UploadfileService.deleteFile(oldImagePath, 'Category Image');
                }
                //Save new category image
                const categoryImage = this.uploadfileService.getUploadFile('categories', image);
                category.image = categoryImage;
            }
            //Update category name and description
            category.name = body.name || category.name;
            category.description = body.description || category.description;

            //Save changes to the database
            await this.categoryRepo.save(category);

            //Return updated category
            return new GetCategoryDto(category);
        } catch (error) {
            console.error('Failed to update category: ', error.message);
            throw new BadRequestException(error.message);
        }
    }

    async deleteCategory(categoryId: number): Promise<DeleteCategoryRepsonseDto> {
        try {
            //Find category by id if it exists
            const category = await this.categoryRepo.findOne({
                relations: ['products'],
                where: { id: categoryId },
            });
            if(!category) throw new NotFoundException(`Category ${categoryId} not found`);

            // Check if category has products
            if(category.products && category.products.length > 0) {
                // Delete all associated products' images first
                for(const product of category.products) {
                    if(product.image) {
                        const productImagePath = path.join(process.cwd(), 'storage/products', product.image.split('/').pop());
                        UploadfileService.deleteFile(productImagePath, 'Product Image');
                    }
                }
            }
            
            //Delete category image if it exists
            if(category.image) {
                const imagePath = path.join(process.cwd(), 'storage/categories', category.image.split('/').pop());
                UploadfileService.deleteFile(imagePath, 'Category Image');
            }

            //Delete the category (this will cascade delete products)
            await this.categoryRepo.remove(category);
            
            //return message
            return { message: `Category ${categoryId} has been deleted` };
        } catch (error) {
            console.error('Failed to delete category: ', error.message);
            throw new BadRequestException(error.message);
        }
    }
}
