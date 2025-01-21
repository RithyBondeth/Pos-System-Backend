import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({
      description: "Product name",
      example: "Macbook Pro M4"
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
      description: "Product description",
      example: "Display 14inch Ram 16GB Storage 1TB"
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiPropertyOptional({
      description: "Product image URL",
      type: 'string',
      format: "binary",
      example: "image/macbookprom4-image.jpg"
    })
    @IsString()
    @IsOptional()
    image: string;

    @ApiProperty({
      description: "Product category name",
      example: "Laptop"
    })
    @IsString()
    @IsNotEmpty()
    category: string;

    @ApiProperty({
      description: "Product price",
      example: 2350.00
    })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    price: number;

    @ApiProperty({
        description: "Product stock quantity",
        example: 50
    })
    @IsNumber()
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    stockQuantity: number;
}