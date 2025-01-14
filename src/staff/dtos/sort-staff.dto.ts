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
    @IsEnum(SortByE)
    @IsOptional()
    sortBy: SortByE = SortByE.firstname;

    @IsEnum(OrderByE)
    @IsOptional()
    orderBy: OrderByE = OrderByE.asc;
}