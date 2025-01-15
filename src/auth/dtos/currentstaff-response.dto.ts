import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CurrentStaffResponseDto {
    @ApiProperty({
        description: "The current staff id",
        example: 1,
    })
    @IsNumber()
    id: number;

    @ApiProperty({
        description: "The current staff firstname",
        example: 'Hem'
    })
    @IsString()
    firstname: string;  

    @ApiProperty({
        description: "The current staff lastname",
        example: "RithyBondeth"
    })
    @IsString()
    lastname: string;

    @ApiProperty({
        description: "The current staff role",
        example: "Cashier"
    })
    @IsString()
    role: string;

    @ApiProperty({
        description: "The current staff expiration time",
        example: 1630659200
    })
    @IsNumber()
    exp: number;

    @ApiProperty({
        description: "The current staff issued at time",
        example: 1630655600
    })
    iat: number;

    constructor(partial: Partial<CurrentStaffResponseDto>) {
        Object.assign(this, partial);
    }
}
