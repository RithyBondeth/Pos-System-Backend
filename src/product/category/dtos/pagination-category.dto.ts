import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class PaginationCategoryDto {
    @ApiPropertyOptional({
        description: "The starting index of the pagination",
        minimum: 0,
        example: 0,
        type: Number,
    }) 
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    skip: number;

    @ApiPropertyOptional({
        description: "The number of record to return",
        minimum: 1,
        example: 10,
        type: Number,
    })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    limit: number;
}