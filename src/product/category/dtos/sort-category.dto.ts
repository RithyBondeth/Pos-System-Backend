import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";

enum SortByE {
    name = "name",
}

enum OrderByE {
    asc = "ASC",
    desc = "DESC",
}

export class SortCategoryDto {
    @ApiPropertyOptional({
        description: "Sort by category name",
        enum: SortByE,
        example: SortByE.name,
    })
    @IsEnum(SortByE)
    @IsOptional()
    sortBy: SortByE = SortByE.name;

    @ApiPropertyOptional({
        description: "Order by ASC or DESC",
        enum: OrderByE,
        example: OrderByE.asc,
    })
    @IsEnum(OrderByE)
    @IsOptional()
    orderBy: OrderByE = OrderByE.asc;
}