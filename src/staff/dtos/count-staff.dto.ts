import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { GenderE, ShiftE } from "@app/common/database/entities/staff/staff.type";

export class CountStaffQueryParamDTO {
    @ApiPropertyOptional({ 
        description: "Staff gender", 
        enum: GenderE,
        example: GenderE.FEMALE 
    })
    @IsEnum(GenderE, { message: "gender must be Male or Female" })
    @IsOptional()
    gender: GenderE;

    @ApiPropertyOptional({ 
        description: "Staff role", 
        example: "Cashier" 
    })
    @IsString()
    @IsOptional()
    role: string;

    @ApiPropertyOptional({ 
        description: "Staff work shift", 
        enum: ShiftE,
        example: ShiftE.FULLTIME
    })
    @IsEnum(ShiftE, { message: "Shift must be Fulltime, Morning, Afternoon or Evening"})
    @IsOptional()
    shift: ShiftE;
}

export class CountStaffResponseDto {
    @ApiProperty({
        description: "Total number of staff matching the filter criteria",
        minimum: 0,
        example: 5,
    })
    @IsNumber()
    total: number;

    constructor(total: number){
        this.total = total;
    }
}