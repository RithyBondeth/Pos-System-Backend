import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDto {
    @ApiPropertyOptional({
      description: "Product name",
      example: "Macbook Pro M4"
    })
    @IsString()
    @IsOptional()
    name: string;

    @ApiPropertyOptional({
      description: "Product description",
      example: "Display 14inch Ram 16GB Storage 1TB"
    })
    @IsString()
    @IsOptional()
    description: string;

    @ApiPropertyOptional({
      description: "Product image URL",
      type: 'string',
      format: "binary",
      example: "image/macbookprom4-image.jpg"
    })
    @IsString()
    @IsOptional()
    @IsOptional()
    image: string;

    @ApiPropertyOptional({
      description: "Product category name",
      example: "Laptop"
    })
    @IsString()
    @IsOptional()
    category: string;

    @ApiPropertyOptional({
      description: "Product price",
      example: 2350.00
    })
    @IsNumber()
    @IsOptional()
    price: number;

    @ApiPropertyOptional({
        description: "Product stock quantity",
        example: 50
    })
    @IsNumber()
    @IsInt()
    @IsOptional()
    stockQuantity: number;
}