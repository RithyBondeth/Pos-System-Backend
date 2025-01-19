import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { GenderE, ShiftE } from "@app/common/database/entities/staff/staff.type";

export class FilterStaffDto {
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
        example: 3,
        type: Number,
    })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    limit: number;

    @ApiPropertyOptional({
        description: "Filter staff by gender",
        enum: GenderE,
        example: GenderE.MALE  
    })
    @IsEnum(GenderE)
    @IsOptional()
    gender: GenderE;

    @ApiPropertyOptional({
        description: "Filter staff by role",
        example: 'Cashier'  
    })
    @IsString()
    @IsOptional()
    role: string;

    @ApiPropertyOptional({
        description: "Filter staff by work shift",
        enum: ShiftE,
        example: ShiftE.FULLTIME   
 
    })
    @IsEnum(ShiftE)
    @IsOptional()
    shift: ShiftE;    
}