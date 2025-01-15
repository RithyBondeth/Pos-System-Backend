import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";

enum SortByE {
    firstname = "firstname",
    salary = "salary",
}

enum OrderByE {
    asc = "ASC",
    desc = "DESC",
}

export class SortStaffDto {
    @ApiPropertyOptional({
        description: "Sort by staff firstname or salary",
        enum: SortByE,
        example: SortByE.salary,
    })
    @IsEnum(SortByE)
    @IsOptional()
    sortBy: SortByE = SortByE.salary;

    @ApiPropertyOptional({
        description: "Order by ASC or DESC",
        enum: OrderByE,
        example: OrderByE.asc,
    })
    @IsEnum(OrderByE)
    @IsOptional()
    orderBy: OrderByE = OrderByE.asc;
}