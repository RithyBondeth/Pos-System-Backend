import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        description: "Category name",
        example: "Electronics"
    }) 
    @IsString()
    @IsNotEmpty()
    name: string; 

    @ApiPropertyOptional({
        description: "Category description",
        example: "Electronics category for various products"
    })
    @IsString()
    @IsOptional()
    description: string;    

    @ApiPropertyOptional({
        description: "Category image URL",
        type: 'string',
        format: "binary",
        example: "categories/category-image.jpg"
    })
    @IsString()
    @IsOptional()
    image: string;
}