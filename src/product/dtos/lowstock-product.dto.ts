import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

export class LowStockProductDto {
    @ApiPropertyOptional({
        description: 'Stock threshold for low stock alert',
        default: 10,
        minimum: 1
    })
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    @IsOptional()
    threshold: number = 10;

    @ApiPropertyOptional({
        description: 'Number of records to skip',
        default: 0,
        minimum: 0
    })
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    @IsOptional()
    skip: number = 0;

    @ApiPropertyOptional({
        description: 'Number of records to return',
        default: 10,
        minimum: 1
    })
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    @IsOptional()
    limit: number = 10;
}