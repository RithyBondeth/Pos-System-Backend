import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CountProductQueryParamDto {
    @ApiPropertyOptional({
        description: "Product category name",
        example: "Laptop"
    })
    @IsString()
    @IsOptional()
    category: string;
}

export class CountProductResponseDto {
    @ApiProperty({
        description: "Total number of products matching the filter criteria",
        minimum: 0,
        example: 5,
    })
    @IsNumber()
    total: number;

    constructor(total: number){
        this.total = total;
    }
}