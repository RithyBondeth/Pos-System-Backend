import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { GenderE, ShiftE } from "src/entities/staff/staff.type";

export class FilterStaffDto {
    @IsNumber()
    @IsPositive()
    @IsOptional()
    skip: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    limit: number;

    @IsEnum(GenderE)
    @IsOptional()
    gender: GenderE;

    @IsString()
    @IsOptional()
    role: string;

    @IsEnum(ShiftE)
    @IsOptional()
    shift: ShiftE;    
}