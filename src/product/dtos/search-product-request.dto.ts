import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class SearchProductRequestDto {
    @ApiPropertyOptional({
        description: 'Search term for product name or description',
        example: 'Smartphone'
    })
    @IsString()
    @IsOptional()
    search: string;

    @ApiPropertyOptional({
        description: 'Minimum price filter',
        example: 100,
        minimum: 0
    })
    @IsNumber()
    @Type(() => Number)
    @Min(0)
    @IsOptional()
    minPrice: number;
    
    @ApiPropertyOptional({
        description: 'Maximum price filter',
        example: 1000
    })
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    maxPrice: number;


    @ApiPropertyOptional({
        description: 'Category name filter',
        example: 'Smartphone'
    })
    @IsOptional()
    @IsString()
    category: string;
    
    @ApiPropertyOptional({
        description: 'Number of records to skip',
        example: 0,
        minimum: 0,
        default: 0
    })
    @IsNumber()
    @Type(() => Number)
    @Min(0)
    @IsOptional()
    skip: number = 0;

    @ApiPropertyOptional({
        description: 'Number of records to return',
        example: 10,
        minimum: 1,
        default: 10
    })
    @IsNumber()
    @Type(() => Number)
    @Min(1)
    @IsOptional()
    limit: number = 10;

    @ApiPropertyOptional({
        description: 'Field to sort by',
        enum: ['name', 'price', 'stockQuantity', 'createdAt'],
        default: 'createdAt'
    })
    @IsString()
    @IsIn(['name', 'price', 'stockQuantity', 'createdAt'])
    @IsOptional()
    sortBy: string = 'createdAt';

    @ApiPropertyOptional({
        description: 'Sort direction',
        enum: ['ASC', 'DESC'],
        default: 'DESC'
    })
    @IsString()
    @IsIn(['ASC', 'DESC'])
    @IsOptional()
    orderBy: 'ASC' | 'DESC' = 'DESC';
}