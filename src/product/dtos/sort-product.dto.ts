import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";

enum SortByE {
    price = "price",
    name = "name",
    stockQuantity = "stockQuantity",
}

enum OrderByE {
    asc = "ASC",
    desc = "DESC",
}

export class SortProductDto {
    @ApiPropertyOptional({
        description: "Sort by product price, name, or stock quantity",
        enum: SortByE,
        example: SortByE.price,
    })
    @IsEnum(SortByE)
    @IsOptional()
    sortBy: SortByE = SortByE.price;

    @ApiPropertyOptional({
        description: "Order by ASC or DESC",
        enum: OrderByE,
        example: OrderByE.asc,
    })
    @IsEnum(OrderByE)
    @IsOptional()
    orderBy: OrderByE = OrderByE.asc;
}