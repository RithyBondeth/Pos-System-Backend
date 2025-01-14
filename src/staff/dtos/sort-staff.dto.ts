import { IsEnum, IsOptional, IsString } from "class-validator";

enum SortByE {
    firstname = "firstname",
    gender = "gender",
    shift = "shift",
    salary = "salary",
}

enum OrderByE {
    asc = "ASC",
    desc = "DESC",
}

export class SortStaffDto {
    @IsEnum(SortByE)
    @IsOptional()
    sortBy: SortByE;

    @IsEnum(OrderByE)
    @IsOptional()
    orderBy: OrderByE;
}