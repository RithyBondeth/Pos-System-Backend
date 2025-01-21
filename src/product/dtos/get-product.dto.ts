import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsInt, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

class Category {
    @ApiProperty({
        description: "Category ID",
        example: 1
    })
    @IsNumber()
    id: number;

    @ApiProperty({
        description: "Category name",
        example: "Smartphone",
    })
    @IsString()
    name: string;

    @ApiHideProperty()
    @Exclude()
    @IsOptional()
    description: string;

    @ApiHideProperty()
    @Exclude()
    @IsOptional()
    image: string;

    @ApiHideProperty()
    @Exclude()
    createdAt: Date;

    @ApiHideProperty()
    @Exclude()
    updatedAt: Date;
}

export class GetProductDto {
    @ApiProperty({
        description: "Product ID",
        example: 1,
    })
    @IsNumber()
    id: number;

    @ApiProperty({
        description: "Product name",
        example: "iPhone 12 Pro Max",
    })
    @IsString()
    name: string;
    
    @ApiProperty({
        description: "Product image file",
        example: "products/iphone12.jpg",
    })
    @IsString()
    image: string;

    @ApiProperty({
        description: "Product description",
        example: "ZP/A Storage 256GB",
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: "Product price",
        example: 520.00,
    })
    @IsNumber()
    @IsPositive()
    price: number;

    @ApiProperty({
        description: "Product stock quantity",
        example: 100,
    })
    @IsNumber()
    @IsInt()
    @IsPositive()
    stockQuantity: number;

    @ApiHideProperty()
    @Exclude()
    category: Category;

    @ApiProperty({
        description: 'Product Category',
        name: 'category',
        example: { id: 1, name: 'Smartphone' }  
    })
    @Expose({ name: "category" })
    transformCategory() {
        return { id: this.category.id, name: this.category.name }
    }

    @ApiHideProperty()
    @Exclude()
    createdAt: Date;
    
    @ApiHideProperty()
    @Exclude()
    updatedAt: Date;

    constructor(partial: Partial<GetProductDto>) {
        return Object.assign(this, partial);
    }
}