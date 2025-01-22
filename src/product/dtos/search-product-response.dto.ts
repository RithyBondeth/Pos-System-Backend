import { ApiPropertyOptional } from "@nestjs/swagger";
import { GetProductDto } from "./get-product.dto";

export class SearchProductResponseDto {
    @ApiPropertyOptional({
        type: [GetProductDto],
        description: 'Array of products matching the search criteria'
    })
    data: GetProductDto[];

    @ApiPropertyOptional({
        description: 'Response metadata',
        example: {
            total: 100,
            skip: 0,
            limit: 10,
            sortBy: 'createdAt',
            orderBy: 'DESC'
        }
    })
    meta: {
        total: number;
        skip: number;
        limit: number;
        sortBy: string;
        orderBy: 'ASC' | 'DESC';
    }

    constructor(partial: Partial<SearchProductResponseDto>) {
        return Object.assign(partial, this);
    }
}